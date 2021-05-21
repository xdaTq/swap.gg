const discord = require('discord.js');
const axios = require('axios');
const config = require('../config.json');

module.exports = {
    name: 'cart',
    run: async (message, args) => {

        const api = 'https://market-api.swap.gg/v1'

        let url, response, swapgg;

        try {
            url = `${api}/cart/items`
            response = await axios.get(url, {
                headers: {
                    'Authorization': `${config.apiKey}`
                }
            })
            swapgg = response.data
        } catch (error) {
            return message.channel.send(`***${args[0]}*** doesn't exist, or data isn't being collected`),
            console.log(error)
        }

        console.log(swapgg.result)

        const swapggembed = new discord.MessageEmbed()
            .setTitle('Swap.gg')
            .setColor(0x15CCB5)
            .addFields(
            {
                name: 'Item Name: ',
                value: JSON.stringify([swapgg.result.items.marketName])
            },
            {
                name: 'Item Image: ',
                value: JSON.stringify([swapgg.result.items.image])
            },
            {
                name: 'Item Price: ',
                value: JSON.stringify([swapgg.result.items.price])
            }
            )

        message.channel.send(swapggembed)

    }
}