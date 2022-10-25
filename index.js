const discord = require('discord.js')
const dotenv = require('dotenv')
const fs = require('fs')
const Client = new discord.Client({
    intents: [
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildMembers,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.GuildMessageReactions,
        discord.GatewayIntentBits.DirectMessages,
        discord.GatewayIntentBits.MessageContent,
    ],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
})

dotenv.config()

Client.commands = new discord.Collection();
Client.events = new discord.Collection();
Client.assets = new discord.Collection();
module.exports.Client = Client

// Event Handler
fs.readdirSync('./events/').forEach(dir => {
    var jsFiles = fs.readdirSync('./events/').filter(f => f.split('.').pop() === 'js');
    if (jsFiles.length <= 0) return console.log('[EVENTS] - No event found! 🔴');
    let check = false
    jsFiles.forEach(file => {
        const eventGet = require(`./events/${file}`)

        try {
            Client.events.set(eventGet.name, eventGet)
            if(check == false) {
                console.log(`[EVENTS] - ${file} was loaded 🟢`)
                check = true
            }
        } catch(error) {
            return console.log(error)
        }
    });
});

// Commands Handler
fs.readdirSync('./commands/').forEach(dir => {
    fs.readdir(`./commands/${dir}`, (err, files) => {
        if (err) throw err;

        var jsFiles = fs.readdirSync(`./commands/${dir}`).filter(f => f.split('.').pop() === 'js');
        if (jsFiles.length <= 0) return console.log('[COMMANDS] - No command found! 🔴');

        jsFiles.forEach(file => {
            var fileGet = require(`./commands/${dir}/${file}`);
            console.log(`[COMMANDS] - ${file} was loaded! 🟢`)

            try {
                Client.commands.set(fileGet.help.name, fileGet);
            } catch (err) {
                return console.log(err);
            }
        });
    });
});

// Assets Handler
fs.readdirSync('./assets/').forEach(dir => {
    fs.readdir(`./assets/${dir}`, (err, files) => {
        if (err) throw err;

        var jsFiles = fs.readdirSync(`./assets/${dir}`).filter(f => f.split('.').pop() === 'js');
        if (jsFiles.length <= 0) return console.log('[ASSETS] - No asset found! 🔴');

        jsFiles.forEach(file => {
            const assetGet = require(`./assets/${dir}/${file}`);
            console.log(`[ASSETS] - ${file} was loaded! 🟢`)

            try {
                Client.assets.set(assetGet.name, assetGet);
            } catch (err) {
                return console.log(err);
            }
        })
    })
})

Client.login(process.env.DISCORD_TOKEN);