const { EmbedBuilder } = require("discord.js");
const { Client } = require('../../index')
const dotenv = require('dotenv')
dotenv.config()

module.exports.run = async (inter) => {
    try {    
        const embed = new EmbedBuilder()
        .setColor('Green')//Green
        .setDescription('🏓 Pong!')

        await inter.reply({embeds: [embed], ephemeral: true})

        // Logs
        const log = new EmbedBuilder()
        .setColor('Grey')
        .setTitle('🛡 Commando: `/ping`')
        .addFields([
            {name: 'Author:', value: `<@${inter.user.id}>`},
            {name: 'Channel:', value: `<#${inter.channel.id}>`},
        ])

        await Client.channels.cache.get(process.env.LOG_CHANNEL).send({embeds: [log]})

    } catch (error) {
        const erro = new EmbedBuilder()
        .setColor('Yellow')
        .setTitle('Oh não, ocorreu um erro!')
        .setDescription('Caso isso persista, contate os desenvolvedores.')

        await inter.editReply({embeds: [erro], ephemeral: true})
        console.log(error)
    }
}

module.exports.help = {
    name: 'ping',
    memberPermissions: []
}