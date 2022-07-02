# Phishy.JS
> An API Wrapper for [phisherman.gg](https://phisherman.gg), currently with 0 external dependencies!

## Installation:

```shell
npm i phishy.js
```

## Usage examples:

```javascript
const { Client } = require('phishy.js');
const api = new Client({ apikey: "YourAPIKeyHere", version: "v2" }) // v1 or v2

// Check a domain to see if it has been reported as Malicious.
api.check("discord.com").then(result => {
    console.log(result)
})

// Check information about a domain if its been reported as malicious or not
api.info("ASk3tchyD0m41n.here").then(result => {
    console.log(result)
})

// Tell the API that there's been another posting of a possibly malicious link.
api.caught("ASk3tchyD0m41n.here", guildID).then(result => {
    console.log(result)
})

// Report a suspicious link to the phisherman.gg API
api.report("ASk3tchyD0m41n.here", guildID).then(result => {
    console.log(result)
})
```

## About Phisherman.GG:
> Phisherman is a centralised database of phishing and scam links. It is designed for use with Discord bots, allowing them to utilise the Phisherman API to cross-check urls against our known phishing links.

## Support for Phisherman.GG:
> [Discord Server](https://discord.gg/QwrpmTgvWy);
> [Documentation](https://docs.phisherman.gg/#/);
> [Red Spider](https://discord.com/users/188032859276181504)

## Support for this API Wrapper:
> [Discord Server](https://discord.gg/QwrpmTgvWy);
> [Ai](https://discord.com/users/398018466856304640)
