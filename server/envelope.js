const express = require("express");
const router = express.Router();
require("dotenv").config();
const docusign = require("docusign-esign");
var restApi = docusign.ApiClient.RestApi;
var oAuth = docusign.ApiClient.OAuth;

var basePath = restApi.BasePath.DEMO;
var oAuthBasePath = oAuth.BasePath.DEMO;

const IntegratorKeyAuthCode = process.env.IK;
const ClientSecret = process.env.SECRET;

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

  // Create a cc template role.
  // We're setting the parameters via setters
  // let cc1 = new docusign.TemplateRole();
  // cc1.email = args.ccEmail;
  // cc1.name = args.ccName;
  // cc1.roleName = 'cc';

  // Add the TemplateRole objects to the envelope object
  env.templateRoles = [signer1];
  env.status = "sent"; // We want the envelope to be sent

  return env;
}

router.post("/", async (req, res) => {
  const accessToken = req.cookies.accessToken;
  apiClient.addDefaultHeader("Authorization", `Bearer ${accessToken}`);

  let envelopesApi = new docusign.EnvelopesApi(apiClient);

  // Make the envelope request body
  let envelope = makeEnvelope({
    templateId: "a6f79b3b-b9e4-4370-bcea-d09ede668628",
    signerEmail: "adityanair102001@gmail.com",
    signerName: "Aditya Nair",
  });

  // Call Envelopes::create API method
  // Exceptions will be caught by the calling function
  let results = await envelopesApi.createEnvelope(
    "6ea27e5d-de33-439a-93b1-8449441af9c7",
    {
      envelopeDefinition: envelope,
    }
  );

  console.log(results);
  res.json({ sent: true });
});
module.exports = router;
