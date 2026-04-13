# Signus API Node.js Example

This project demonstrates a complete end-to-end integration with the Signus API using Node.js.

It walks through the full document lifecycle:

- create a template
- generate a document from template
- send for signature
- complete signing
- download the final signed PDF

## Prerequisites

- Node.js (v18+ recommended)
- Signus account: https://app.signus.ai/join
- API access enabled for your account

## Setup

```bash
npm install
```

Create a `.env` file:

```
SIGNUS_API_KEY=your_api_key
ACCOUNT_ID=your_account_id
BASE_URL=https://api.signus.ai
```

## Run

```bash
npm test
```

## Build

```bash
npm run build
```

## What this example covers

- Create template (file, recipient, signature field)
- List templates
- Get template details
- Create document from template
- Verify draft state
- Send for signature
- Verify pending state
- Simulate signing flow
- Verify completed state
- Download final PDF

## API Reference

https://api.signus.ai/docs

## Support

support@signus.ai

## Signup:

https://app.signus.ai/join
