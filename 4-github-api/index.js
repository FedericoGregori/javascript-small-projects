const startLoader = element => {
    element.innerHTML = `<div class="loading-spinner"></div>`;
}

const stopLoader = (element, value) => {
    element.textContent = value;
}

class FetchWrapper {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    get(endpoint) {
        return fetch(this.baseURL + endpoint)
            .then(response => response.json());
    }

    put(endpoint, body) {
        return this._send("put", endpoint, body);
    }

    post(endpoint, body) {
        return this._send("post", endpoint, body);
    }

    delete(endpoint, body) {
        return this._send("delete", endpoint, body);
    }

    _send(method, endpoint, body) {
        return fetch(this.baseURL + endpoint, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => response.json());
    }
}

const API = new FetchWrapper('https://api.github.com/');

const form = document.querySelector("#repos-form");
const username = document.querySelector('#github-username');
const list = document.querySelector('#repos-list');
const button = document.querySelector('#get-repos');

form.addEventListener("submit", event => {
    event.preventDefault();
    list.innerHTML = "";
    startLoader(button);

    API.get(`users/${username.value}/repos`)
    .then(data => {
        console.log(data);
        data.forEach(repository => {
            list.insertAdjacentHTML('beforeend', 
            `<a href=${repository.html_url} target="_blank"><li><h2>${repository.full_name}</h2><p>${repository.description}</p></li></a>`
            )
        })
        stopLoader(button, "Get repos");
    })
})