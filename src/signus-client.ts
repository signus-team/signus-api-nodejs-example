import {
  ApiResponse,
  CreateDocumentFromTemplateRequest,
  CreateDocumentFromTemplateResponse,
  DocumentDetails,
  PageablePayload,
  SendForSignatureRequest,
  SendForSignatureResponse,
  TemplateDetails,
  TemplateItem,
} from "./types";

export class SignusClient {
  private readonly baseUrl: string;
  private readonly accountId: string;
  private readonly apiKey: string;

  constructor(baseUrl: string, accountId: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.accountId = accountId;
    this.apiKey = apiKey;
  }

  private headers(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.apiKey}`,
    };
  }

  private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const url = `${this.baseUrl}/v1/accounts/${this.accountId}${path}`;
    const response = await fetch(url, {
      method,
      headers: {
        ...this.headers(),
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`API error ${response.status}: ${errorBody}`);
    }

    const json = (await response.json()) as ApiResponse<T>;
    return json.payload;
  }

  async listTemplates(): Promise<PageablePayload<TemplateItem>> {
    return this.request("GET", "/templates");
  }

  async getTemplate(templateId: string): Promise<TemplateDetails> {
    return this.request("GET", `/templates/${templateId}`);
  }

  async createDocumentFromTemplate(
    request: CreateDocumentFromTemplateRequest,
  ): Promise<CreateDocumentFromTemplateResponse> {
    return this.request("POST", "/documents/from-template", request);
  }

  async getDocument(documentId: string): Promise<DocumentDetails> {
    return this.request("GET", `/documents/${documentId}`);
  }

  async sendForSignature(
    documentId: string,
    request?: SendForSignatureRequest,
  ): Promise<SendForSignatureResponse> {
    return this.request("POST", `/documents/${documentId}/send`, request ?? {});
  }

  async downloadCombinedPdf(documentId: string): Promise<{ data: ArrayBuffer; filename: string }> {
    const url = `${this.baseUrl}/v1/accounts/${this.accountId}/documents/${documentId}/files/combined/content`;
    const response = await fetch(url, { headers: this.headers() });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`API error ${response.status}: ${errorBody}`);
    }

    const contentDisposition = response.headers.get("content-disposition") || "";
    const match = /filename=UTF-8''([^;]+)/i.exec(contentDisposition);
    const filename = match?.[1] ? decodeURIComponent(match[1]) : "combined.pdf";
    const data = await response.arrayBuffer();

    return { data, filename };
  }
}
