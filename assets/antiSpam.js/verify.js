const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, } = require('discord.js');
const { Client } = require('../../index')
const dotenv = require('dotenv')
dotenv.config()

Client.on('ready', () => {
    const channel = process.env.VERIFICACAO_CHANNEL

    Client.channels.cache.get(channel).bulkDelete(5)

    try {
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Bem vinde ao Discord da TransDevs!', iconURL: 'https://i.imgur.com/S8jPCM6.png' })
            .setTitle(`Clique no botão abaixo para iniciar sua verificação:`)
            .setColor('Green')

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('verificar')
                    .setLabel('Iniciar Verificação')
                    .setStyle(ButtonStyle.Success)
            )

        Client.channels.cache.get(channel).send({ content: ``, embeds: [embed], components: [row] })
    } catch (error) {
        console.log(error)
    }

    Client.on('interactionCreate', async inter => {
        if (!inter.isButton()) return
        const verificado = process.env.VERIFICADO
        const button = inter.customId
        const member = inter.member

        try {
            if (button == 'verificar') {
                if (member.roles.cache.some(role => role.id === verificado)) {
                    inter.reply({ content: `Você já está verificade!`, ephemeral: true })

                    // Logs
                    const log = new EmbedBuilder()
                        .setColor('Grey')
                        .setTitle('✅ Verificão:')
                        .setDescription(`<@${inter.user.id}> clicou, mas estava verificade!`)

                    await Client.channels.cache.get(process.env.LOG_CHANNEL).send({ embeds: [log] })
                } else {
                    member.roles.add(verificado)
                    inter.reply({ content: `Você foi verificade!`, ephemeral: true })

                    // Logs
                    const log = new EmbedBuilder()
                        .setColor('Grey')
                        .setTitle('✅ Verificação:')
                        .setDescription(`<@${inter.user.id}> foi verificade!`)

                    await Client.channels.cache.get(process.env.LOG_CHANNEL).send({ embeds: [log] })
                }
            }
        } catch (error) {
            console.log(error)
        }
    })
})