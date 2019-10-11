//Band name for URL

function gigNameUrl() {
  let gigName = (document.getElementById("nameForUrl").value = document
    .getElementById("name")
    .value.toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-"));
};

//Venue name for URL (Gig Form)

function venueNameUrl() {
  let venueName = (document.getElementById("venueForUrl").value = document
    .getElementById("venue")
    .value.toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-"));
};

//Venue name for URL (Venue Form)

function venueNameChange() {
  let gigName = (document.getElementById("nameForUrl").value = document
    .getElementById("name")
    .value.toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-"));
};