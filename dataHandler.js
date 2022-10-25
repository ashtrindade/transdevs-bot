const { ApplicationCommandOptionType } = require("discord.js");
const dotenv = require('dotenv')
dotenv.config()

async function createCmd(Client, guildId) {
    const data = [
        //------ ADMIN ------//
        // ping cmd
        {
            name: 'ping',
            description: '🛡 Pong!',
        },

        // cargos cmd
        {
            name: 'cargos',
            description: '🛡 Instruções do Roleypoly',
        },

        // sobre cmd
        {
            name: 'sobre',
            description: '🛡 Bio do Servidor'
        },

        // say cmd
        {
            name: 'say',
            description: '🛡 Envia uma mensagem',
            options: [
                {
                    name: 'canal',
                    type: ApplicationCommandOptionType.Channel,
                    description: 'Canal de destino.',
                    required: true,
                },
                {
                    name: 'texto',
                    type: ApplicationCommandOptionType.String,
                    description: 'Insira a mensagem.',
                    required: true,
                },
                {
                    name: 'add1',
                    type: ApplicationCommandOptionType.String,
                    description: 'Adicionar um parágrafo.',
                    required: false,
                },
                {
                    name: 'add2',
                    type: ApplicationCommandOptionType.String,
                    description: 'Adicionar um parágrafo.',
                    required: false,
                },
                {
                    name: 'add3',
                    type: ApplicationCommandOptionType.String,
                    description: 'Adicionar um parágrafo.',
                    required: false,
                },
                {
                    name: 'add4',
                    type: ApplicationCommandOptionType.String,
                    description: 'Adicionar um parágrafo.',
                    required: false,
                },
                {
                    name: 'add5',
                    type: ApplicationCommandOptionType.String,
                    description: 'Adicionar um parágrafo.',
                    required: false,
                },
                {
                    name: 'add6',
                    type: ApplicationCommandOptionType.String,
                    description: 'Adicionar um parágrafo.',
                    required: false,
                },
                {
                    name: 'add7',
                    type: ApplicationCommandOptionType.String,
                    description: 'Adicionar um parágrafo.',
                    required: false,
                },
                {
                    name: 'add8',
                    type: ApplicationCommandOptionType.String,
                    description: 'Adicionar um parágrafo.',
                    required: false,
                },
                {
                    name: 'add9',
                    type: ApplicationCommandOptionType.String,
                    description: 'Adicionar um parágrafo.',
                    required: false,
                },
                {
                    name: 'add10',
                    type: ApplicationCommandOptionType.String,
                    description: 'Adicionar um parágrafo.',
                    required: false,
                },
            ]
        },

        // url cmd
        {
            name: 'url',
            description: '🛡 Link usando markdown',
            options: [
                {
                    name: 'titulo',
                    type: ApplicationCommandOptionType.String,
                    description: 'Adicione o texto alternativo',
                    required: true,
                },
                {
                    name: 'url',
                    type: ApplicationCommandOptionType.String,
                    description: 'Adicione o texto alternativo',
                    required: true,
                },
            ]
        },

        // media cmd
        {
            name: 'media',
            description: '🛡 Envia uma imagem',
            options: [
                {
                    name: 'canal',
                    type: ApplicationCommandOptionType.Channel,
                    description: 'Canal de destino.',
                    required: true,
                },
                {
                    name: 'img',
                    type: ApplicationCommandOptionType.String,
                    description: 'Link da imagem',
                    required: true,
                },
                {
                    name: 'alt',
                    type: ApplicationCommandOptionType.String,
                    description: 'Adicione o texto alternativo',
                    required: true,
                },
            ]
        },

        // verify cmd
        {
            name: 'verify',
            description: '🛡 Envia painel de verificação.'
        },

        //------ MEMBER ------//
        // sugerir cmd
        {
            name: 'sugerir',
            description: 'Dê sugestões para a o Servidor'
        },


    ]

    await Client.guilds.cache.get(process.env.GUILD)?.commands.set(data);
}

async function globalCmd(Client) {
    const data = [
        // ping cmd
        {
            name: 'ping',
            description: 'Pong!',
        },
    ]
    await Client.application?.commands.set(data);
}
module.exports = { createCmd, globalCmd }