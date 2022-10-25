const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle,} = require('discord.js');
const { Client } = require('../../index')
const dotenv = require('dotenv')
dotenv.config()

module.exports.run = async (inter) => {
    try {
        const canal = inter.channel.id

        const embed = new EmbedBuilder()
            .setThumbnail('https://i.imgur.com/S8jPCM6.png')
            .setTitle('Bem vinde ao Discord da TransDevs!')
            .setDescription(`Clique no botão abaixo para iniciar sua verificação:`)
            .setColor('Green')

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('verificar')
                    .setLabel('Iniciar Verificação')
                    .setStyle(ButtonStyle.Success)
            )

        await Client.channels.cache.get(canal).send({content: ``, embeds: [embed], components: [row]})

        await inter.reply({ content: `Mensagem enviada para o canal <#${canal}>!`, ephemeral: true })

        // Logs
        const log = new EmbedBuilder()
            .setColor('Grey')
            .setTitle('🛡 Commando: `/verify`')
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
    name: 'verify',
    memberPermissions: []
}