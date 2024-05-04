const express = require('express');

class App {
    constructor() {
        this.router = express.Router();
        this.router.get('/', (req, res) => {
            res.send("Welcome to the API!");
        });
    }
}

const api = new App();

module.exports = api;
