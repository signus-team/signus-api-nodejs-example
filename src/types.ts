// --- Generic response wrapper ---

export interface ApiResponse<T> {
  payload: T;
}

export interface PageablePayload<T> {
  thisPageItems: T[];
  totalNumber: number;
  lastPageIndex: number;
}

// --- Enums as string unions ---

export type DocumentStatus = "DRAFT" | "PENDING" | "COMPLETED" | "DECLINED" | "VOIDED" | "EXPIRED";

export type RecipientType = "SIGNER" | "VIEWER";

export type DocumentSigningOrder = "PARALLEL" | "SEQUENTIAL";

export type FieldType =
  | "SIGNATURE"
  | "INITIALS"
  | "STAMP"
  | "DATE"
  | "DATE_SIGNED"
  | "FULL_NAME"
  | "FIRST_NAME"
  | "LAST_NAME"
  | "EMAIL"
  | "PHONE_NUMBER"
  | "COMPANY"
  | "TITLE"
  | "ADDRESS"
  | "SHORT_TEXT"
  | "LONG_TEXT"
  | "DROPDOWN"
  | "CHECKBOX"
  | "AMOUNT"
  | "PAY_NOW";

// --- Template types ---

export interface TemplateItem {
  id: string;
  name: string;
  signingOrder: DocumentSigningOrder;
  numberOfFiles: number;
  hasRecipients: boolean;
  createdAt: string;
}

export interface TemplateFile {
  id: string;
  name: string;
  sortingIndex: number;
  numberOfPages: number;
}

export interface TemplateParty {
  recipientId: string;
  type: RecipientType;
  signingIndex: number | null;
  partyName?: string | null;
}

export interface TemplateField {
  id: string;
  fileId: string;
  recipientId: string;
  type: FieldType;
  page: number;
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface TemplateDetails {
  id: string;
  name: string;
  signingOrder: DocumentSigningOrder;
  createdAt: string;
  files: TemplateFile[];
  parties: TemplateParty[];
  fields: TemplateField[];
}

// --- Document types ---

export interface DocumentFile {
  id: string;
  name: string;
  sortingIndex: number;
  numberOfPages: number;
}

export interface DocumentRecipient {
  id: string;
  type: RecipientType;
  fullName: string;
  email: string;
  signingIndex: number | null;
  partyName?: string | null;
}

export interface DocumentField {
  id: string;
  fileId: string;
  recipientId: string;
  type: FieldType;
  page: number;
  top: number;
  left: number;
  width: number;
  height: number;
  value?: string | null;
}

export interface DocumentDetails {
  id: string;
  name: string;
  status: DocumentStatus;
  signingOrder: DocumentSigningOrder;
  createdAt: string;
  files: DocumentFile[];
  recipients: DocumentRecipient[];
  fields: DocumentField[];
}

// --- Request / Response types ---

export interface CreateDocumentSigner {
  recipientId: string;
  name: string;
  email: string;
}

export interface CreateDocumentFromTemplateRequest {
  templateId: string;
  signers: CreateDocumentSigner[];
}

export interface CreateDocumentFromTemplateResponse {
  documentId: string;
}

export interface SendForSignatureRequest {
  subject?: string;
  message?: string;
}

export interface SendForSignatureResponse {
  status: DocumentStatus;
}
