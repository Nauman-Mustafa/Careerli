// Depreceated
const SibApiV3Sdk = require("sib-api-v3-sdk");
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =
  "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";
const apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
const emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();

emailCampaigns.name = "Testing";
emailCampaigns.subject = "Testing";
emailCampaigns.htmlContent = "Testing";
emailCampaigns.sender = { name: "Ekkel AI TESTING", email: "testing@ekkel.ai" };
emailCampaigns.type = "classic";
emailCampaigns.htmlContent =
  "Testing Testing Testing Testing Testing Testing Testing Testing Testing Testing Testing Testing";

emailCampaigns.recipients = "yasir.aslam@ekkel.ai";

const SendMail = () => {};

export { SendMail };
