"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// TODO: select the list element where the suggestions should go, and all three dropdown elements
//  HINT: look at the HTML
const listOfSuggestions = document.querySelector("#suggestions");
const firstDropdownSun = document.querySelector("#sun");
const secondDropdownMoon = document.querySelector("#moon");
const thirdDropdownRising = document.querySelector("#rising");
// Here, when the value of sun is changed, we will call the method postAndUpdate.
// TODO: Do the same for moon and rising
firstDropdownSun.addEventListener("change", postAndUpdate);
secondDropdownMoon.addEventListener("change", postAndUpdate);
thirdDropdownRising.addEventListener("change", postAndUpdate);
function postAndUpdate() {
    // TODO: empty the suggestionList (you want new suggestions each time someone types something new)
    //  HINT: use .innerHTML
    listOfSuggestions.innerHTML = "";
    // TODO: add a type annotation to make this of type MatchesRequestData
    const postParameters = {
        // TODO: get the text inside the input box
        //  HINT: use sun.value to get the value of the sun field, for example
        "sun": firstDropdownSun.value,
        "moon": secondDropdownMoon.value,
        "rising": thirdDropdownRising.value,
    };
    console.log(postParameters);
    // TODO: make a POST request using fetch to the URL to handle this request you set in your Main.java
    //  HINT: check out the POST REQUESTS section of the lab and of the front-end guide.
    //  Make sure you add "Access-Control-Allow-Origin":"*" to your headers.
    //  Remember to add a type annotation for the response data using the Matches type you defined above!
    fetch("http://127.0.0.1:8080/result", {
        method: 'post',
        body: JSON.stringify(postParameters),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        },
    })
        // TODO: Call and fill in the updateSuggestions method in one of the .then statements in the Promise
        //  Parse the JSON in the response object
        //  HINT: remember to get the specific field in the JSON you want to use
        .then((response) => response.json())
        .then((jsonResponse) => {
        updateSuggestions(jsonResponse.data);
    });
}
function updateSuggestions(matches) {
    // TODO: for each element in the set of matches, append it to the suggestionList
    //  HINT: use innerHTML += to append to the suggestions list
    //  NOTE: you should use <li> (list item) tags to wrap each element. When you do so,
    //  make sure to add the attribute 'tabindex="0"' (for example: <li tabindex="0">{your element}</li>).
    //  This makes each element selectable via screen reader.
    for (let i = 0; i < matches.length; i++) {
        listOfSuggestions.innerHTML += `<li tabindex=\"${i}\">${matches[i]}</li>\n`;
    }
}
// TODO: create an event listener to the document (document.addEventListener) that detects "keyup".
//  When a certain key of your choice is clicked, reset the values of sun, moon, and rising to your own
//  values for the sun, moon, and rising using updateValues. Then call postAndUpdate().
//  HINT: the listener callback function should be asynchronous and wait until the values are
//  updated before calling postAndUpdate().
function updateValues(sunval, moonval, risingval) {
    return __awaiter(this, void 0, void 0, function* () {
        // This line asynchronously waits 1 second before updating the values.
        // It's unnecessary here, but it simulates asynchronous behavior you often have to account for.
        yield new Promise(resolve => setTimeout(resolve, 1000));
        firstDropdownSun.value = sunval;
        secondDropdownMoon.value = moonval;
        thirdDropdownRising.value = risingval;
        document.addEventListener("keyup", () => updateValues("Leo", "Leo", "Leo")
            .then(postAndUpdate));
    });
}
