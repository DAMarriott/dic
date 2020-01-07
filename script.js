import { getGif } from "./gif-script.js";
import { performSearch } from "./definition-script.js";
import { searchHistory, loadHistory, dicHistory } from "./searchHistory.js";

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const searchTerm = $("#js-search-term").val();
    $("#gif").empty();
    performSearch(searchTerm, () => {
      getGif(searchTerm);
      searchHistory(searchTerm);
    });
  });
}

//clears search log
$("button").click(event => {
  localStorage.clear();
  $("li").empty();
  let dicHistory = [];
});

$(watchForm);
$(loadHistory);
