import { performSearch } from "./definition-script.js";
import { getGif } from "./gif-script.js";

let dicHistory = [];

// live during the session
function searchHistory(searchTerm) {
  if (dicHistory.includes(searchTerm)) {
    return;
  }
  localStorage.setItem(searchTerm, searchTerm);
  dicHistory.push(searchTerm);
  let newHistoryItem = $(`<li><a>${searchTerm.toLowerCase()}</a></li>`);
  newHistoryItem.click(function() {
    performSearch(searchTerm, () => {
      getGif(searchTerm);
    });
  });
  $("#history-list").append(newHistoryItem);
  $("#history").removeClass("hidden");
}

// after page load
function loadHistory() {
  Object.keys(localStorage).forEach(key => {
    let newHistoryItem = $(`<li><a>${key.toLowerCase()}</a></li>`);
    newHistoryItem.click(function() {
      performSearch(key, () => {
        getGif(key);
      });
    });
    $("#history-list").append(newHistoryItem);
    $("#history").removeClass("hidden");
  });
}

function clearHistory() {
  dicHistory = [];
  localStorage.clear();
}

export { loadHistory, searchHistory, clearHistory };
