const { EmbedBuilder } = require('discord.js');
const { Client } = require('../../index')
const dotenv = require('dotenv')
dotenv.config()

module.exports.run = async (inter) => {
    try {
        const titulo = inter.options.getString('titulo')
        const url = inter.options.getString('url')
        const canal = inter.channel.id

        const embed = new EmbedBuilder()
        .setColor('LightGrey')
        .setDescription(`[${titulo}](${url})`)

        await Client.channels.cache.get(canal).send({content: ``, embeds: [embed]})

        await inter.reply({ content: `Mensagem enviada para o canal <#${canal}>!`, ephemeral: true })

        // Logs
        const log = new EmbedBuilder()
            .setColor('Grey')
            .setTitle('🛡 Commando: `/url`')
            .addFields([
                { name: 'Author:', value: `<@${inter.user.id}>` },
                { name: 'Channel:', value: `<#${inter.channel.id}>`},
                { name: 'Título:', value: titulo},
                { name: 'URL:', value: url},
            ])

        await Client.channels.cache.get(process.env.LOG_CHANNEL).send({ embeds: [log] })

    } catch (error) {
        const erro = new EmbedBuilder()
        .setColor('Yellow')
        .setTitle('Oh não, ocorreu um erro!')
        .setDescription('Caso isso persista, contate os desenvolvedores.')

        await inter.reply({embeds: [erro], ephemeral: true})
        console.log(error)
    }
}

module.exports.help = {
    name: 'url',
    memberPermissions: []
}