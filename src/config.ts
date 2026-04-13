import dotenv from "dotenv";

dotenv.config();

export interface Config {
  baseUrl: string;
  accountId: string;
  apiKey: string;
  templateId: string;
  templateRecipientId: string;
  signerName: string;
  signerEmail: string;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config: Config = {
  baseUrl: requireEnv("BASE_URL"),
  accountId: requireEnv("ACCOUNT_ID"),
  apiKey: requireEnv("SIGNUS_API_KEY"),
  templateId: requireEnv("TEMPLATE_ID"),
  templateRecipientId: requireEnv("TEMPLATE_RECIPIENT_ID"),
  signerName: process.env.SIGNER_NAME || "Jane Doe",
  signerEmail: process.env.SIGNER_EMAIL || "jane.doe@example.com",
};
