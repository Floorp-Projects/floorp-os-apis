/* MPL-2.0 */
// Aggregated re-exports resolved only within api-types/ folder (proto -> ts)
// Re-export generated ts-proto types (flattened output under gen/ts)
// ts-proto (onlyTypes=true) outputs under gen/ts/proto/* retaining path
export type { OkResponse, ErrorResponse, HealthResponse, Rect } from "./gen/ts/proto/common.ts";
export type { Tab, HistoryItem, Download, BrowserContext } from "./gen/ts/proto/browser_info.ts";
export * as Scraper from "./gen/ts/proto/scraper.ts";
export * as Tabs from "./gen/ts/proto/tabs.ts";

// Note: RouteMap types have been removed in favor of proto message contracts.
