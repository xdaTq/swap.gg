const Discord = require('discord.js');
const Client = new Discord.Client();
const axios = require('axios');
const config = require('./config.json');

const fs = require('fs');
const { type } = require('os');

var version = `${config.version}`;
var prefix = `${config.prefix}`;

Client.commands = new Discord.Collection();

// Command-Handler
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    Client.commands.set(command.name, command);
}

Client.on('ready', (message) => {
    console.log(`BOT#1 | Connected as : ${Client.user.tag}`, ` | `, `version : ${version}`)

    Client.user.setActivity(`Swap.gg | BOT#1`, {
        type: 'PLAYING'
    }).catch(console.error)
});

Client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.authtor) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'version') {
        Client.commands.get('version').run(message, args)
    }
    if (command === 'api') {
        Client.commands.get('api').run(message, args)
    }
    if (command === 'market') {
        Client.commands.get('market').run(message, args)
    }
    if (command === 'cart') {
        Client.commands.get('cart').run(message, args)
    }
});

Client.login(config.token);