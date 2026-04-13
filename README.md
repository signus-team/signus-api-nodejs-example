# Signus API Node.js Example

This project demonstrates a complete end-to-end integration with the Signus API using Node.js.

It walks through the document lifecycle using the v1 API:

1. List templates
2. Get template details
3. Create a document from a template
4. Verify the document is in DRAFT status
5. Send the document for signature
6. Verify the document is in PENDING status

After the signer completes signing via the email link, you can also use the API to verify COMPLETED status and download the final signed PDF.

## Prerequisites

- Node.js (v18+ recommended)
- A Signus account: https://app.signus.ai/join
- An API key created in Signus UI (Settings > API Keys)
- A template created in Signus UI with at least one file, one signer recipient, and one signature field

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and fill in your values:

```
BASE_URL=https://api.signus.ai
ACCOUNT_ID=your_account_id
SIGNUS_API_KEY=your_api_key
TEMPLATE_ID=your_template_id
TEMPLATE_RECIPIENT_ID=your_recipient_id
SIGNER_NAME=Jane Doe
SIGNER_EMAIL=jane.doe@example.com
```

To find your `TEMPLATE_RECIPIENT_ID`, run the test once with just the first four variables filled in. The "Get template details" step will print the recipient IDs.

## Run

```bash
npm test
```

## Build

```bash
npm run build
```

## What this example covers

- List account templates (`GET /v1/accounts/{id}/templates`)
- Get template details (`GET /v1/accounts/{id}/templates/{templateId}`)
- Create document from template (`POST /v1/accounts/{id}/documents/from-template`)
- Get document details (`GET /v1/accounts/{id}/documents/{documentId}`)
- Send for signature (`POST /v1/accounts/{id}/documents/{documentId}/send`)
- Download combined PDF (`GET /v1/accounts/{id}/documents/{documentId}/files/combined/content`)

## API Reference

https://api.signus.ai/docs

## Support

support@signus.ai

## Signup:

https://app.signus.ai/join
