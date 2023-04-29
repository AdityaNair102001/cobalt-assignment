const express = require("express");
const router = express.Router();
require("dotenv").config();
const docusign = require("docusign-esign");
var restApi = docusign.ApiClient.RestApi;
var oAuth = docusign.ApiClient.OAuth;

var basePath = restApi.BasePath.DEMO;
var oAuthBasePath = oAuth.BasePath.DEMO;

const apiClient = new docusign.ApiClient({
  basePath: basePath,
  oAuthBasePath: oAuthBasePath,
});

function makeEnvelope(args) {
  // Create the envelope definition
  let env = new docusign.EnvelopeDefinition();
  env.templateId = args.templateId;

  // Create template role elements to connect the signer and cc recipients
  // to the template
  // We're setting the parameters via the object creation
  let signer1 = docusign.TemplateRole.constructFromObject({
    email: args.signerEmail,
    name: args.signerName,
    roleName: "signer",
  });

  // Add the TemplateRole objects to the envelope object
  env.templateRoles = [signer1];
  env.status = "sent"; // We want the envelope to be sent

  return env;
}

router.post("/", async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    const accoundId = req.session.accountId;
    const { templateId, signerEmail, signerName } = req.body;

    apiClient.addDefaultHeader("Authorization", `Bearer ${accessToken}`);

    let envelopesApi = new docusign.EnvelopesApi(apiClient);

    // Make the envelope request body
    let envelope = makeEnvelope({
      templateId: templateId,
      signerEmail: signerEmail,
      signerName: signerName,
    });

    // Call Envelopes::create API method
    // Exceptions will be caught by the calling function

    let results = await envelopesApi.createEnvelope(accoundId, {
      envelopeDefinition: envelope,
    });

    console.log(results);
    if (results.status === "sent") {
      res.json({
        success: true,
        status: results.status,
        message: "Envelope has been sent!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
});
module.exports = router;
