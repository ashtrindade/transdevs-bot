const { EmbedBuilder } = require('discord.js');
const { Client } = require('../../index')
const dotenv = require('dotenv')
dotenv.config()

module.exports.run = async (inter) => {
    try {
        const canal = inter.channel.id

        const embed = new EmbedBuilder()
        .setColor('ff75ed') //pink
        .setThumbnail('https://i.imgur.com/S8jPCM6.png')
        .setTitle('Bem vinde ao TransDevs!')
        .setDescription('**TransDevs** é uma comunidade de programação que surgiu para suprir a falta de de comunidades desse tipo voltadas para pessoas trans.\nNão importa se você programa pouco ou muito, todes são super bem vinde aqui.')
        .addFields([
            { name: 'TranDevs é um projeto do grupo **LGBTQ+ Spacey**', value: '[lgbtqspacey.com](https://lgbtqspacey.com)'},
            { name: 'Redes Sociais:', value: '- [Twitter](https://twitter.com/lgbtqspacey)\n- [Instagram](https://www.instagram.com/lgbtqspacey/)'},
        ])

        await Client.channels.cache.get(canal).send({content: ``, embeds: [embed]})

        await inter.reply({ content: `Mensagem enviada para o canal <#${canal}>!`, ephemeral: true })

        // Logs
        const log = new EmbedBuilder()
            .setColor('Grey')
            .setTitle('🛡 Commando: `/sobre`')
            .addFields([
                { name: 'Author:', value: `<@${inter.user.id}>` },
                { name: 'Channel:', value: `<#${inter.channel.id}>`},
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
    name: 'sobre',
    memberPermissions: []
}