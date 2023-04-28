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

router.get("/", (req, res) => {
  console.log(req.cookies);
  const accessToken = req.cookies.accessToken;
  console.log("accessToken from template", accessToken);
  console.log(req.session.accountId);
  apiClient.addDefaultHeader("Authorization", `Bearer ${accessToken}`);

  // create TemplatesApi object
  const templatesApi = new docusign.TemplatesApi(apiClient);

  // list templates
  templatesApi
    .listTemplates(req.session.accountId)
    .then((response) => {
      console.log(response.envelopeTemplates);
      const templates = response.envelopeTemplates;
      console.log(`Found ${templates.length} templates:`);
      templates.forEach((template) => {
        console.log(`${template.templateId} - ${template.name}`);
      });
      res.json({ tem: "plate" });
    })
    .catch((error) => {
      console.error(error);
    });
});
module.exports = router;
