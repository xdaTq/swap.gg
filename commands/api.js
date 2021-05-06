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

        // optional console.log(swapgg)

        const swapggembed = new discord.MessageEmbed()
            .setTitle('Swap.gg')
            .setThumbnail(swapgg.result.avatar)
            .addFields(
            {
                name: 'Name: ',
                value: swapgg.result.username
            }
            )

        message.channel.send(swapggembed)
    }
};