const discord = require('discord.js');
const axios = require('axios');
const config = require('../config.json');
const {
    chownSync
} = require('fs');

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

        if (swapgg.result.items === null || swapgg.result.items === undefined || swapgg.result.items === '' || swapgg.result.items.length === 0) {

            const errorembed = new discord.MessageEmbed()
                .setTitle('Your cart is empty.')
                .setColor(0x15CCB5)

            message.channel.send(errorembed)

        } else {

            for (let i = 0; i < items.length; i++) {

                let current = items[i];
                let currentPrice = current.sale.price
                let currentPriceToStr = currentPrice.toString();
                let comaprePrice = 10000

                let newPrice
                let newPrice1
                
                if (currentPrice >= comaprePrice) {
                    newPrice = `${currentPriceToStr.substring(0, 3)},${currentPriceToStr.substring(3, 5)}$`

                    console.log(newPrice)
                } else if (currentPrice < comaprePrice) {
                    newPrice1 = `${currentPriceToStr.substring(0, 2)},${currentPriceToStr.substring(2, 5)}$`

                    console.log(newPrice1);
                }

                const swapggembed = new discord.MessageEmbed()
                    .setTitle('Swap.gg')
                    .setColor(0x15CCB5)
                    .addFields({
                        name: 'Item Name: ',
                        value: current.marketName
                    }, {
                        name: 'Item type: ',
                        value: current.meta.TYPE
                    }, {
                        name: 'Item Category: ',
                        value: current.meta.CATEGORY
                    }, {
                        name: 'Item Price: ',
                        value: `${newPrice}`
                    }, {
                        name: 'Steam Price: ',
                        value: `${current.prices.steam}$`
                    })

                message.channel.send(swapggembed)

            }
        }
    }
}