"use strict";

const SEARCH_URL =
  "https://api.giphy.com/v1/gifs/search?api_key=9wo63Zrt9s5iYbIncE5apFFDBOzSOBjQ&q=";

function displayGif(responseJson) {
  $("#gif").empty();
  $("#gif").append(`<div class="resultbox">
  <img src="${responseJson.data[0].images.original.url}"/>
        </div>`);
}

function getGif(query) {
  let url = SEARCH_URL + query;
  fetch(url)
    .then(handleResponse)
    .then(responseJson => displayGif(responseJson))
    .catch(handleError);
}

const handleResponse = response => {
  if (!response.ok) {
    if (response.statusText) {
      throw new Error(response.statusText);
    } else {
      throw response;
    }
  }

  return response.json();
};

const handleError = err => {
  if (typeof err.json === "function") {
    err.json().then(errBody => {
      $("#js-error-message").text(
        `Something went wrong: ${errBody[0].message}`
      );
    });
  } else {
    $("#js-error-message").text(`Something went wrong: ${err.message}`);
  }
};

export { getGif };
