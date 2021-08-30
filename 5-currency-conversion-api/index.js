import FetchWrapper from "./fetch-wrapper.js";

const base = document.querySelector("#base-currency");
const target = document.querySelector("#target-currency");
const result = document.querySelector("#conversion-result");

// MAKE SURE TO REPLACE YOUR API KEY IN THE URL BELOW
const API = new FetchWrapper("https://v6.exchangerate-api.com/v6/96c4d6ed83fdaf693491d8dd");

const getConversionRates = () => {
    API.get(`/latest/${base.value}`)
    .then(data => {
        result.textContent = data.conversion_rates[target.value];
    });
};

base.addEventListener("change", () => {
    getConversionRates();
});
target.addEventListener("change", () => {
    getConversionRates();
});