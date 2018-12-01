module.exports = {
  port: process.env.PORT || 3000,
  authorization: {
    "production": 'http://localhost:5000/user/validate',
    "development": 'http://localhost:5001/user/validate'
  },
  services: [{
      "name": "User",
      "env": {
        "production": {
          "prefix": "/v1/user",
          "removePrefixBeforeProxy": true,
          "port": 5000
        },
        "development": {
          "prefix": "/v1/user",
          "removePrefixBeforeProxy": true,
          "port": 5001
        }
      }
    },
    {
      "name": "General",
      "env": {
        "production": {
          "prefix": "/v1",
          "removePrefixBeforeProxy": true,
          "port": 3010,
          "secureRoutes": [{
            regex: "\/contact-form\?.*",
            "methods": [
              "POST"
            ],
            userPools: [
              "customers"
            ]
          }]
        },
        "development": {
          "prefix": "/v1",
          "removePrefixBeforeProxy": true,
          "port": 3011,
          "secureRoutes": [{
            regex: "\/contact-form\?.*",
            "methods": [
              "POST"
            ],
            userPools: [
              "customers"
            ]
          }]
        }
      }
    }
  ]
};