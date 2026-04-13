import { config } from "../src/config";
import { SignusClient } from "../src/signus-client";

describe("Signus API - Document Lifecycle", () => {
  const client = new SignusClient(config.baseUrl, config.accountId, config.apiKey);
  let documentId: string;

  // Step 1: List all templates in the account
  it("Step 1: List templates", async () => {
    const templates = await client.listTemplates();

    console.log(`Found ${templates.totalNumber} template(s)`);
    console.log(
      "Templates:",
      JSON.stringify(
        templates.thisPageItems.map((t) => ({ id: t.id, name: t.name })),
        null,
        2,
      ),
    );

    expect(templates.thisPageItems.length).toBeGreaterThan(0);
  });

  // Step 2: Get details of the configured template
  it("Step 2: Get template details", async () => {
    const template = await client.getTemplate(config.templateId);

    console.log(`Template: ${template.name}`);
    console.log(`  Files: ${template.files.length}`);
    console.log(`  Parties: ${template.parties.length}`);
    console.log(`  Party recipient IDs: ${template.parties.map((p) => p.recipientId).join(", ")}`);
    console.log(`  Fields: ${template.fields.length}`);
    console.log(`  Signing order: ${template.signingOrder}`);

    expect(template.id).toBe(config.templateId);
    expect(template.files.length).toBeGreaterThan(0);
    expect(template.parties.length).toBeGreaterThan(0);
  });

  // Step 3: Create a draft document from the template
  it("Step 3: Create document from template", async () => {
    const result = await client.createDocumentFromTemplate({
      templateId: config.templateId,
      signers: [
        {
          recipientId: config.templateRecipientId,
          name: config.signerName,
          email: config.signerEmail,
        },
      ],
    });

    documentId = result.documentId;
    console.log(`Created document: ${documentId}`);

    expect(documentId).toBeDefined();
  });

  // Step 4: Verify the document is in DRAFT status
  it("Step 4: Get document - verify DRAFT status", async () => {
    const doc = await client.getDocument(documentId);

    console.log(`Document: ${doc.name}`);
    console.log(`  Status: ${doc.status}`);
    console.log(`  Recipients: ${doc.recipients.length}`);
    console.log(`  Files: ${doc.files.length}`);
    console.log(`  Fields: ${doc.fields.length}`);

    expect(doc.status).toBe("DRAFT");
    expect(doc.recipients).toHaveLength(1);
    expect(doc.recipients[0].fullName).toBe(config.signerName);
    expect(doc.recipients[0].email).toBe(config.signerEmail.toLowerCase());
  });

  // Step 5: Send the document for signature
  it("Step 5: Send document for signature", async () => {
    const result = await client.sendForSignature(documentId, {
      subject: "Please sign this document",
      message: "Hello, please review and sign this document at your earliest convenience.",
    });

    console.log(`Send result status: ${result.status}`);

    expect(result.status).toBe("PENDING");
  });

  // Step 6: Verify the document is now PENDING
  it("Step 6: Get document - verify PENDING status", async () => {
    const doc = await client.getDocument(documentId);

    console.log(`Document status after send: ${doc.status}`);

    expect(doc.status).toBe("PENDING");
  });

  // Steps 7-10 require the signer to complete signing via the email link.
  // After the signer completes:
  //   - getDocument() will return status = "COMPLETED"
  //   - downloadCombinedPdf() will return the final signed PDF
});
