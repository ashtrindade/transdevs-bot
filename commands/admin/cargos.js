const { EmbedBuilder } = require("discord.js");
const { Client } = require('../../index')
const dotenv = require('dotenv')
dotenv.config()

module.exports.run = async (inter) => {
    try {    
        const canal = inter.channel.id

        const embed = new EmbedBuilder()
        .setColor('Green')//Green
        .setThumbnail('https://i.imgur.com/S8jPCM6.png')
        .setTitle('Bem vinde ao Trans Devs')
        .setDescription('Use o <@363916474127220739> para definir seus pronomes, linguagens de programação e uma cor para personalizar seu nome :)')
        .addFields([
            {name: 'Ver cargos disponíveis:', value: '`/pickable-roles` - </pickable-roles:939204947571015710>'},
            {name: 'Escolher cargo:', value: '`/pick-role` - </pick-role:939397697616642140>'},
            {name: 'Remover cargo:', value: '`/remove-role` - </remove-role:939397697616629820>'},
        ])

        await Client.channels.cache.get(canal).send({content: ``, embeds: [embed]})

        await inter.reply({ content: `Mensagem enviada!`, ephemeral: true })

        // Logs
        const log = new EmbedBuilder()
        .setColor('Grey')
        .setTitle('🛡 Commando: `/cargos`')
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

        await inter.reply({embeds: [erro], ephemeral: true})
        console.log(error)
    }
}

module.exports.help = {
    name: 'cargos',
    memberPermissions: []
}