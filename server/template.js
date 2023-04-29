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

router.get("/", async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;

    apiClient.addDefaultHeader("Authorization", `Bearer ${accessToken}`);

    // create TemplatesApi object
    const templatesApi = new docusign.TemplatesApi(apiClient);

    // list templates
    const response = await templatesApi.listTemplates(req.session.accountId);
    console.log(response.envelopeTemplates);
    const templates = response.envelopeTemplates;
    console.log(`Found ${templates.length} templates:`);
    const allTemplateDetails = templates.map((template) => {
      return {
        id: template.templateId,
        name: template.name,
        ownerEmail: template.owner.userName,
      };
    });
    console.log(allTemplateDetails);
    res.status(200).json({ success: true, templates: allTemplateDetails });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
});
module.exports = router;
