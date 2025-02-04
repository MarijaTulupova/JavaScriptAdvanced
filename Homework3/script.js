let selectCountry = document.getElementById("selectCountry");
let selectBtn = document.getElementById("selectBtn");
let countryName = document.getElementById("countryName");
let countryBorders = document.getElementById("countryBorders");
let content = document.getElementById("content");
let errorMessage = document.getElementById("errorMessage");
let lastSelectedCountryCode = undefined;

const fetchAllCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries = await response.json();

    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    countries.forEach((country) => {
      const optionElement = document.createElement("option");
      optionElement.value = country.cca3;
      optionElement.textContent = country.name.common;
      selectCountry.appendChild(optionElement);
    });
  } catch (error) {
    errorMessage.textContent =
      "Oops! Something went wrong. Please try again later.";
    errorMessage.style.display = "block";
    content.style.display = "none";
  }
};

fetchAllCountries();

const fetchCountryByCountryCode = async (selectedCountryCode) => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${selectedCountryCode}`
    );
    const data = await response.json();
    const country = data[0];

    countryName.textContent = `Name of the country: ${country.name.common} (${country.cca3})`;

    const { borders } = country;

    if (!borders || borders.length === 0) {
      countryBorders.textContent = "No neighboring countries.";
    } else {
      await fetchNeighbouringCountriesByCountryCodes(borders.join(","));
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchNeighbouringCountriesByCountryCodes = async (countryCodes) => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${countryCodes}`
    );
    const countries = await response.json();

    const countryNames = countries.map(
      (country) => `${country.name.common} (${country.cca3})`
    );
    countryBorders.textContent = `Country neighbors: ${countryNames.join(
      ", "
    )}.`;
  } catch (error) {
    console.error("Error fetching neighboring countries:", error);
  }
};

selectBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let selectedCountryCode = document.getElementById("selectCountry").value;
  if (lastSelectedCountryCode !== selectedCountryCode) {
    fetchCountryByCountryCode(selectedCountryCode);
    lastSelectedCountryCode = selectedCountryCode;
  }
});
