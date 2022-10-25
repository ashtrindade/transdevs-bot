const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { Client } = require('../../index')
const dotenv = require('dotenv')
dotenv.config()

module.exports.run = async (inter) => {
    try {
        const alt = inter.options.getString('alt')
        const img = inter.options.getString('img')
        const canal = inter.options.getChannel('canal').id

        // Interaction Reply
        const file = new AttachmentBuilder()
            .setFile(img)
            .setDescription(alt)

        await Client.channels.cache.get(canal).send({ content: ``, files: [file] })

        await inter.reply({ content: `Imagem enviada para o canal <#${canal}>!`, ephemeral: true })

        // Logs
        const log = new EmbedBuilder()
            .setColor('Grey')
            .setTitle('🛡 Commando: `/media`')
            .addFields([
                { name: 'Author:', value: `<@${inter.user.id}>` },
                { name: 'Channel:', value: `<#${inter.channel.id}>` },
                { name: 'Media:', value: img},
                { name: 'Alt:', value: alt},
            ])

        await Client.channels.cache.get(process.env.LOG_CHANNEL).send({ embeds: [log] })

    } catch (error) {
        const erro = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle('Oh não, ocorreu um erro!')
            .setDescription('Caso isso persista, contate os desenvolvedores.')

        await inter.reply({ embeds: [erro], ephemeral: true })
        console.log(error)
    }
}

module.exports.help = {
    name: 'media',
    memberPermissions: []
}