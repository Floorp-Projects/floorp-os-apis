/* MPL-2.0 */
// Aggregated re-exports resolved only within api-types/ folder (proto -> ts)
export type { OkResponse, ErrorResponse, HealthResponse, Rect } from "./gen/ts/common.ts";
export type { Tab, HistoryItem, Download, BrowserContext } from "./gen/ts/browser_info.ts";
export type * as Scraper from "./gen/ts/scraper.ts";
export type * as Tabs from "./gen/ts/tabs.ts";

// Note: RouteMap types have been removed in favor of proto message contracts.
