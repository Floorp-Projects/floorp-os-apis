/* Auto-generated placeholder from proto (ts-proto-like shapes) */

export interface Tab {
  id: number;
  url: string;
  title: string;
  isActive: boolean;
  isPinned: boolean;
}

export interface HistoryItem {
  url: string;
  title: string;
  lastVisitDate: string | number; // forceLong=string or number fallback
  visitCount: number;
}

export interface Download {
  id: number;
  url: string;
  filename: string;
  status: string;
  startTime: string | number; // epoch millis
}

export interface BrowserContext {
  history: HistoryItem[];
  tabs: Tab[];
  downloads: Download[];
}

// Optional request helpers (for clients)
export interface GetHistoryRequest { limit?: number }
export interface GetDownloadsRequest { limit?: number }
export interface GetContextRequest { historyLimit?: number; downloadLimit?: number }

