"use strict";

const apiKey = "18fe046869afc29a3c7155152d1a5943e64ff6e0";

const searchURL = "https://owlbot.info/api/v3/dictionary/";

function displayResults(responseJson) {
  console.log(responseJson);

  $("#results-list").empty();
  $("#results-list").append(`<h3>${responseJson.word}</h3>`);
  for (let i = 0; i < responseJson.definitions.length; i++) {
    $("#results-list").append(
      `<div class="resultbox">
      <p>${i + 1}. ${responseJson.definitions[i].type}</p>
      <p>Pronunciation: ${responseJson.pronunciation}</p>
      <p>Definition: ${responseJson.definitions[i].definition}</p>
      </div>`
    );
  }

  $("#results").removeClass("hidden");

  let newHistoryItem = $(
    `<li><a href="#${responseJson.word}">${responseJson.word}</a></li>`
  );
  newHistoryItem.click(function() {
    performSearch(responseJson.word);
  });
  $("#history-list").append(newHistoryItem);
  $("#history").removeClass("hidden");
}

function getDefinition(query) {
  const url = searchURL + query;
  console.log(url);

  fetch(url, {
    headers: {
      Authorization: `Token ${apiKey}`
    }
  })
    .then(handleResponse)
    .then(responseJson => displayResults(responseJson))
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

function performSearch(word) {
  getDefinition(word);
  $("#results-list").empty();
  $("#js-error-message").empty();
}

export { performSearch };
