"use strict";

const apiKey = "18fe046869afc29a3c7155152d1a5943e64ff6e0";

const searchURL = "https://owlbot.info/api/v3/dictionary/";


function displayResults(responseJson) {
  console.log(responseJson);

  $("#results-list").empty();
  $("#results-list").append(
    `<div><h3>${responseJson.word}</h3>`
  )
  for (let i = 0; i < responseJson.definitions.length; i++) {
    $("#results-list").append(
      `
      <p>${i+1}. ${responseJson.definitions[i].type}</p>
      <p>${responseJson.pronunciation}</p>
      <p>${responseJson.definitions[i].definition}</p>
      </div>`
    );
  }

  $("#results").removeClass("hidden");
}

function getDefinition(query) {
  const url = searchURL + query;
  console.log(url);
  fetch(url, {
      headers: {
          Authorization: `Token ${apiKey}`
      }
    }
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      else {
        throw new Error(response.statusText);
      }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

const searchTerm = $("#js-search-term").val();

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const searchTerm = $("#js-search-term").val();
    getDefinition(searchTerm);
  });
}

$(watchForm);