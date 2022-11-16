const Client = require('../index').Client
const { ActivityType, EmbedBuilder } = require('discord.js')
const { createCmd, globalCmd } = require('../dataHandler')

const dotenv = require('dotenv')
dotenv.config()

Client.on('ready', () => {
    Client.user.setPresence({
        activities: [{ name: 'Code', type: ActivityType.Playing }],
        status: 'online'
    })
    console.log(`${Client.user.tag} is online! 🟢`)

    // Logs
    const log = new EmbedBuilder()
        .setColor('Green')
        .setDescription(`<@1034112946567135242> is online! 🟢`)

    Client.channels.cache.get(process.env.LOG_CHANNEL).send({ embeds: [log] })

    globalCmd(Client)
    createCmd(Client, process.env.GUILD)
})