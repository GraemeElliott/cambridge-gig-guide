//Band name for URL

function gigNameUrl() {
  let gigName = (document.getElementById("nameForUrl").value = document
    .getElementById("name")
    .value.toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-"));
};

function venueNameUrl() {
  let venueName = (document.getElementById("venueForUrl").value = document
    .getElementById("venue")
    .value.toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-"));
};

function venueNameChange() {
  let gigName = (document.getElementById("nameForUrl").value = document
    .getElementById("name")
    .value.toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-"));
};