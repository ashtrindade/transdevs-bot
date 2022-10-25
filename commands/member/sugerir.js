const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, InteractionType } = require("discord.js")
const Client = require('../../index').Client
const dotenv = require('dotenv')
dotenv.config()

module.exports.run = async (inter) => {
    try {
        if (!inter.isChatInputCommand()) return

        // Create Modal
        const modal = new ModalBuilder()
            .setCustomId(`sugest`)
            .setTitle('Diga-nos sua sugestão')

        // Create Input
        const sugestInput = new TextInputBuilder()
            .setCustomId('sugestInput')
            .setLabel('Qual a sugestão?')
            .setStyle(TextInputStyle.Short)

        // Create Input
        const descricaoInput = new TextInputBuilder()
            .setCustomId('descricaoInput')
            .setLabel('Se desejar, descreva sua sugestão.')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(false)

        // Add Action Row to each input
        const sugestRow = new ActionRowBuilder().addComponents(sugestInput)
        const descricaoRow = new ActionRowBuilder().addComponents(descricaoInput)

        // Add inputs to the modal
        modal.addComponents(sugestRow, descricaoRow)

        await inter.showModal(modal)

        // Logs
        const log = new EmbedBuilder()
            .setColor('Grey')
            .setTitle('🛡 Commando: `/sugerir`')
            .addFields([
                { name: 'Author:', value: `<@${inter.user.id}>` },
                { name: 'Channel:', value: `<#${inter.channel.id}>` },
            ])

        await Client.channels.cache.get(process.env.LOG_CHANNEL).send({ embeds: [log] })

        //--------------- Receiving modal submissions ------------------------//
        Client.on('interactionCreate', async inter => {
            try {
                if (inter.type !== InteractionType.ModalSubmit) return

                if (inter.customId === `sugest`) {
                    await inter.reply({ content: `**Sugestão enviada!**`, ephemeral: true })

                    const sugestao = inter.fields.getTextInputValue('sugestInput')
                    const descricao = inter.fields.getTextInputValue('descricaoInput')
                    const canal = process.env.SUGESTOES_CHANNEL

                    const embed = new EmbedBuilder()
                        .setColor('Green') //Green
                        .setTitle(':inbox_tray: Nova Sugestão')
                        .addFields([
                            { name: 'Autore:', value: `<@${inter.user.id}>`},
                            { name: 'Sugestão:', value: `${sugestao}` },
                            { name: 'Descrição:', value: `→ ${descricao}`},
                        ])

                    await Client.channels.cache.get(canal).send({ embeds: [embed] })
                }
            } catch (err) { }
        })
    } catch (error) {
        const erro = new EmbedBuilder()
            .setColor('Yellow') //Yellow
            .setTitle('Oh não, ocorreu um erro!')
            .setDescription('Caso isso persista, contate os desenvolvedores.')

        await inter.editReply({ embeds: [erro], ephemeral: true })
        console.log(error)
    }
}

module.exports.help = {
    name: 'sugerir',
    memberPermissions: []
}