/* ============================================================
   KECAI Packaging — cloud.js
   WorkBuddy Cloud Service client (form inquiries persistence)
   ============================================================ */

/* publicConfig from the app's cloud service activation.
   publishableKey identifies the app and carries no permissions by itself;
   the server enforces an exact Origin match. */
var KECAI_PUBLIC_CONFIG = {
  endpoint: "https://kecai-packaging.app.workbuddy.host",
  publishableKey: "wbpk_GzrUk8kGSiPyhXNAdTShDZ_aOeZFv3L5jysuEPDRCgeNoO6ryOrW1cB"
};

var kecaiCloud = null;
if (window.WorkBuddyCloud && WorkBuddyCloud.createWorkBuddyCloud) {
  kecaiCloud = WorkBuddyCloud.createWorkBuddyCloud({
    endpoint: KECAI_PUBLIC_CONFIG.endpoint,
    publishableKey: KECAI_PUBLIC_CONFIG.publishableKey
  });
}
