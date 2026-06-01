import { mkdtemp, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { curatedDataset } from "../data/curated";
import { ImportCache } from "./cache";
import { PacedPublicPageFetcher } from "./fetcher";
import { parsePublicMatchReportSnapshot, parsePublicSportsSnapshot } from "./parser";
import { OehbPublicImporter } from "./service";
import { SANITIZED_REPORT_FIXTURE } from "./fixtures";

const snapshot = (payload: unknown = curatedDataset) => `<html><script id="matchcenter-sports-data" type="application/json">${JSON.stringify(payload)}</script></html>`;

describe("public sports parser", () => {
  it("parses strict allowlisted fixture payload", () => {
    expect(parsePublicSportsSnapshot(snapshot()).matches).toHaveLength(4);
  });

  it("rejects forbidden nested fields", () => {
    expect(() => parsePublicSportsSnapshot(snapshot({ ...curatedDataset, metadata: { ...curatedDataset.metadata, refereeEmail: "excluded" } }))).toThrow("Forbidden field rejected");
  });

  it("rejects missing structured sports payload", () => {
    expect(() => parsePublicSportsSnapshot("<html>unknown OEHB markup</html>")).toThrow("No validated matchcenter sports payload found");
  });

  it("parses sanitized report statistics and events", () => {
    const report = parsePublicMatchReportSnapshot(SANITIZED_REPORT_FIXTURE);
    expect(report.teamStatistics).toHaveLength(2);
    expect(report.playerStatistics).toEqual([]);
    expect(report.events.map((event) => event.type)).toEqual(["half-time", "full-time"]);
  });

  it("rejects forbidden report fields", () => {
    expect(() => parsePublicMatchReportSnapshot(SANITIZED_REPORT_FIXTURE.replace('"events": [', '"referees": [], "events": ['))).toThrow("Forbidden field rejected");
  });
});

describe("paced fetcher", () => {
  it("rejects non-allowlisted URLs before request", async () => {
    const request = vi.fn();
    await expect(new PacedPublicPageFetcher(0, 0, request).fetch("https://example.com/")).rejects.toThrow("not allowlisted");
    expect(request).not.toHaveBeenCalled();
  });

  it("paces retries and aborts after bounded attempts", async () => {
    const request = vi.fn().mockRejectedValue(new Error("offline"));
    const sleep = vi.fn().mockResolvedValue(undefined);
    const now = vi.fn().mockReturnValueOnce(1000).mockReturnValueOnce(1000).mockReturnValueOnce(1000).mockReturnValueOnce(1000).mockReturnValueOnce(1000).mockReturnValue(3000);
    const fetcher = new PacedPublicPageFetcher(1500, 2, request, sleep, now);
    await expect(fetcher.fetch("https://www.oehb.at/de/bewerbe/lv/nul-OOoeHV-LLM")).rejects.toThrow("after 3 attempts");
    expect(request).toHaveBeenCalledTimes(3);
    expect(sleep).toHaveBeenCalled();
  });
});

describe("import service", () => {
  it("writes normalized output and reuses fresh raw cache", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "oehb-import-"));
    const fetcher = { fetch: vi.fn().mockResolvedValue({ sourceUrl: "https://www.oehb.at/de/bewerbe/lv/nul-OOoeHV-LLM", retrievedAt: "2026-06-01T00:00:00.000Z", body: snapshot() }) };
    const importer = new OehbPublicImporter(new ImportCache(root, 24 * 60 * 60 * 1000), fetcher);
    expect((await importer.importCompetition("oohv-maenner-landesliga")).cacheHit).toBe(false);
    expect((await importer.importCompetition("oohv-maenner-landesliga")).cacheHit).toBe(true);
    expect(fetcher.fetch).toHaveBeenCalledTimes(1);
    expect(JSON.parse(await readFile(path.join(root, "normalized/oohv-maenner-landesliga.json"), "utf8")).matches).toHaveLength(4);
    expect(JSON.parse(await readFile(path.join(root, "normalized/oohv-maenner-landesliga.json"), "utf8")).parserProvenance[0].parserVersion).toBe("oehb-public-v1");
  });
});
