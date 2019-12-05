import { getGif } from "./gif-script.js";
import { performSearch } from "./definition-script.js";

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const searchTerm = $("#js-search-term").val();
    performSearch(searchTerm);
    getGif(searchTerm);
  });
}

$(watchForm);
