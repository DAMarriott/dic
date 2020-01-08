"use strict";

const apiKey = "18fe046869afc29a3c7155152d1a5943e64ff6e0";

const searchURL = "https://owlbot.info/api/v3/dictionary/";

function displayResults(responseJson, cb) {
  $("#results-list").empty();
  $("#results-list").append(`<h3>${responseJson.word.toLowerCase()}</h3>
  <p class="italic">${responseJson.pronunciation}</p>`);
  for (let i = 0; i < responseJson.definitions.length; i++) {
    $("#results-list").append(
      `<div class="resultbox">
      <p>${i + 1}. ${responseJson.definitions[i].type}</p>
      <p>Definition: ${responseJson.definitions[i].definition}</p>
      </div>`
    );
  }

  $("#results").removeClass("hidden");
  cb();
}

function getDefinition(query, cb) {
  const url = searchURL + query;

  fetch(url, {
    headers: {
      Authorization: `Token ${apiKey}`
    }
  })
    .then(handleResponse)
    .then(responseJson => displayResults(responseJson, cb))
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
      let err = errBody[0].message;
      $("#js-error-message").text(err);
    });
  } else {
    $("#js-error-message").text(`Something went wrong: ${err.message}`);
  }
};

function performSearch(word, cb) {
  getDefinition(word, cb);
  $("#results-list").empty();
  $("#js-error-message").empty();
}

export { performSearch };
