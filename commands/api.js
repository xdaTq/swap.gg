const discord = require('discord.js');
const axios = require('axios');
const config = require('../config.json')

module.exports = {
    name: 'api',
    run: async (message, args) => {

        const api = 'https://market-api.swap.gg/v1'

        let url, response, swapgg;

        try {
            url = `${api}/user/me`
            response = await axios.get(url, {
                headers: {
                    'Authorization': `${config.apiKey}`
                }
            })
            swapgg = response.data
        } catch (error) {
            return message.channel.send(`***${args[0]}*** doesn't exist, or data isn't being collected`), console.log(error)
        }

        console.log(swapgg.result)

        const swapggembed = new discord.MessageEmbed()
            .setTitle('Swap.gg')
            .setColor(0x15CCB5)
            .setThumbnail(swapgg.result.avatar)
            .addFields(
            {
                name: 'Name: ',
                value: swapgg.result.username
            },
            {
                name: 'UserId: ',
                value: swapgg.result.userId
            },
            {
                name: 'SteamId: ',
                value: swapgg.result.platform.steam.steamId,
            },
            {
                name: 'SteamTradeLink: ',
                value: swapgg.result.platform.steam.tradeLink
            }
            )

        message.channel.send(swapggembed)
    }
};