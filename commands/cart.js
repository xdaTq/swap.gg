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

        let items = swapgg.result.items
        console.log(items)

        for (let i = 0; i < items.length; i++) {
            let current = items[i];

            const swapggembed = new discord.MessageEmbed()
                .setTitle('Swap.gg')
                .setColor(0x15CCB5)
                .addFields(
                {
                    name: 'Item Name: ',
                    value: current.marketName
                },
                {
                    name: 'Item type: ',
                    value: current.meta.TYPE
                },
                {
                    name: 'Item Category: ',
                    value: current.meta.CATEGORY
                },
                {
                    name: 'Item Price: ',
                    value: current.sale.price
                },
                {
                    name: 'Steam Price: ',
                    value: current.prices.steam
                }
                )
    
            message.channel.send(swapggembed)
            
            
        }


    }
}