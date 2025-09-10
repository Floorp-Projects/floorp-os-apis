/* Auto-generated placeholder from proto (ts-proto-like shapes) */

export interface TabEntry {
  browserId: string;
  title: string;
  url: string;
  selected: boolean;
  pinned: boolean;
}

export interface CreateTabInstanceRequest { url: string; options?: { inBackground?: boolean } }
export interface CreateTabInstanceResponse { instanceId: string }
export interface AttachRequest { browserId: string }
export interface AttachResponse { instanceId?: string }
export interface InstanceId { id: string }

export interface NavigateRequest { url: string }
export interface URIResponse { uri: string }
export interface HTMLResponse { html?: string }
export interface ElementResponse { element?: string }
export interface TextResponse { text?: string }
export interface ValueResponse { value?: string }

export interface Selector { selector: string }
export interface WaitForElementRequest { selector: string; timeout?: number }
export interface FoundResponse { found?: boolean }
export interface ClickedResponse { clicked?: boolean }
export interface ExecuteScriptRequest { script: string }
export interface ImageResponse { image?: string }
export interface RegionScreenshotRequest { rect: { x?: number; y?: number; width?: number; height?: number } }
export interface FormDataEntry { selector: string; value: string }
export interface FillFormRequest { formData: FormDataEntry[] }

