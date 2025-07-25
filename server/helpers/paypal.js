const paypal = require("paypal-rest-sdk");

paypal.configure({
    mode:"sandbox",
    client_id:"AS2wvrEn4bGu5rT6G-4GeRnORG8cIUcnHP28-wzwBPWnOgC4t5Xc5LkArUkK11u5haOuhnn7JLolVfur",
    client_secret:"EHx42AxnR8qGVKDorFjHLbSmPzVC8ZlfKvUWEpUvjVLmgvG9lClFQeWiqNoMTEuTIUu0jsdh5kbpN9hH"
});

module.exports = paypal;