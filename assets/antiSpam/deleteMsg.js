const { EmbedBuilder } = require('discord.js');
const { Client } = require('../../index')
const dotenv = require('dotenv')
dotenv.config()

Client.on('messageCreate', async message => {
    if (!message.author.bot) {
        
        if (message.channel.id == process.env.CARGOS_CHANNEL) {
            try {
                await message.delete()

                // Logs
                const log = new EmbedBuilder()
                    .setColor('Grey')
                    .setTitle('🛡 Anti-Spam: `cargos`')
                    .addFields([
                        { name: 'Author:', value: `<@${message.author.id}>` },
                        { name: 'Channel:', value: `<#${message.channel.id}>` },
                        { name: 'Message:', value: `${message.content}` },
                    ])

                await Client.channels.cache.get(process.env.LOG_CHANNEL).send({ embeds: [log] })
            } catch (error) {
                console.log(error)
            }
        }
    }
}
)