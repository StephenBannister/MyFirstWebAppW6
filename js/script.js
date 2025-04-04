
// Used to load common content into other HTML files
// This is for the menu in the header
fetch("header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header-placeholder").innerHTML = data;
  });

// This is for the footer
fetch("footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer-placeholder").innerHTML = data;
  });


// Logic for validation of input elements in the 'contact' form. Can be expanded as required.
function validateForm() {
  const vFields = [
    { name: "firstname", message: "First name must be completed", id: "validateFname" },
    { name: "lastname", message: "Last name must be completed", id: "validateLname" },
    { name: "email", message: "Email must be completed", id: "validateEmail" }
  ];

  let valid = true;

  vFields.forEach(vField => {
    const inputValue = document.forms["contact"][vField.name].value.trim();
    const validationElement = document.getElementById(vField.id);

    if (!inputValue) {
      validationElement.innerHTML = vField.message;
      validationElement.style.color = "red";
      validationElement.style.fontSize = "10px";
      valid = false;
    }
    else {
      validationElement.innerHTML = "";
    }
  });
  return valid;
}

// Logic to add a tick to the end of the input boxes on the 'contact' form when information is entered.
// Week5 - Now also validates the format of the email address before showing the tick.
function addTick(inputElement) {
  const tickElement = inputElement.nextElementSibling;
  const value = inputElement.value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (inputElement.type == "email") {
    tickElement.style.visibility = emailPattern.test(value) ? 'visible' : 'hidden';
  }
  else {
    tickElement.style.visibility = value.length > 0 ? 'visible' : 'hidden';
}
}

// Logic to call api: api.postcodes.io/postcodes/ and lookup a UK postcode input
async function findPostcode() {
  const postcode = document.getElementById("postcode").value;
  const url = "https://api.postcodes.io/postcodes/?q=" + postcode;
  cityElement = document.getElementById("city");
  countryElement = document.getElementById("country");

  try {
    const response = await fetch(url);
    const json = await response.json();

    if (json.result && json.result.length > 0) {
      const result = json.result[0];
      const city = result.nuts;
      const country = result.country;

      cityElement.innerHTML = city;
      cityElement.style.color = "green";
      cityElement.style.fontWeight = "bold";

      countryElement.value = country;
      addTick(document.getElementById("country"));
    }
    else {
      cityElement.innerHTML = "No UK results found for this postcode.";
      cityElement.style.color = "red";
      cityElement.style.fontWeight = "bold";
      countryElement.value = "Elsewhere"
    }
  }
  catch (error) {
    cityElement.innerHTML = "Error fetching postcode data.", error;
    cityElement.style.color = "red";
    cityElement.style.fontWeight = "bold";
  }
}