browser.contextMenus.create({
  id: "search-with-google-scholar",
  title: "Search with Google Scholar",
  contexts: ["selection"],
});
browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "search-with-google-scholar") {
    // Encodes the selected text as a URI component
    const queryText = encodeFormDataURIComponent(info.selectionText);
    // Construct the query URL
    const queryUrl = "https://scholar.google.com/scholar?q=" + queryText;

    // Create a new tab under the current tab, does not switch to it
    // immediately
    browser.tabs.create({
      active: false,
      openerTabId: tab.id,
      url: queryUrl
    }).catch((error) => {
      console.error("Failed to open new tab: " + error);
    });
  }
});

function encodeFormDataURIComponent(str) {
  // Replace spaces with + for application/x-www-form-urlencoded
  return encodeURIComponent(str).replace(/%20/g, "+");
}