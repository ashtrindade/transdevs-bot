const { EmbedBuilder } = require('discord.js');
const { Client } = require('../../index')
const dotenv = require('dotenv')
dotenv.config()

module.exports.run = async (inter) => {
    try {
        const texto = inter.options.getString('texto')
        const canal = inter.options.getChannel('canal').id
        let add1 = inter.options.getString('add1')
        let add2 = inter.options.getString('add2')
        let add3 = inter.options.getString('add3')
        let add4 = inter.options.getString('add4')
        let add5 = inter.options.getString('add5')
        let add6 = inter.options.getString('add6')
        let add7 = inter.options.getString('add7')
        let add8 = inter.options.getString('add8')
        let add9 = inter.options.getString('add9')
        let add10 = inter.options.getString('add10')

        if (add1 == null) {add1 = ''}
        if (add2 == null) {add2 = ''}
        if (add3 == null) {add3 = ''}
        if (add4 == null) {add4 = ''}
        if (add5 == null) {add5 = ''}
        if (add6 == null) {add6 = ''}
        if (add7 == null) {add7 = ''}
        if (add8 == null) {add8 = ''}
        if (add9 == null) {add9 = ''}
        if (add10 == null) {add10 = ''}

        await Client.channels.cache.get(canal).send({content: `${texto} \n${add1} \n${add2} \n${add3} \n${add4} \n${add5} \n${add6} \n${add7} \n${add8} \n${add9} \n${add10}`})

        await inter.reply({ content: `Mensagem enviada para o canal <#${canal}>!`, ephemeral: true })

        // Logs
        const log = new EmbedBuilder()
            .setColor('Grey')
            .setTitle('🛡 Commando: `/say`')
            .addFields([
                { name: 'Author:', value: `<@${inter.user.id}>` },
                { name: 'Channel:', value: `<#${inter.channel.id}>`},
                { name: 'Message:', value: `${texto} \n${add1} \n${add2} \n${add3} \n${add4} \n${add5} \n${add6} \n${add7} \n${add8} \n${add9} \n${add10}`}
            ])

        await Client.channels.cache.get(process.env.LOG_CHANNEL).send({ embeds: [log] })

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
    name: 'say',
    memberPermissions: []
}