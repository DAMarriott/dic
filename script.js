import { getGif } from "./gif-script.js";
import { performSearch } from "./definition-script.js";
import { searchHistory, loadHistory } from "./searchHistory.js";

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const searchTerm = $("#js-search-term").val();
    performSearch(searchTerm, () => {
      getGif(searchTerm);
      searchHistory(searchTerm);
    });
  });
  $("button").click(event => {
    localStorage.clear();
    $("#history").empty();
  });
}

$(watchForm);
$(loadHistory);
