const { ChannelType } = require('discord.js')

const Client = require('../index').Client

Client.on('messageCreate', async message => {
    if(message.author.bot || message.channel.type == ChannelType.DM) return
})