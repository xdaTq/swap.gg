const discord = require('discord.js');
const axios = require('axios');
const config = require('../config.json')

module.exports = {
    name: 'market',
    run: async (message, args) => {

        const api = 'https://market-api.swap.gg/v1'

        let url, response, swapgg;

        //rust item appid=252490

        try {
            url = `${api}/pricing/lowest?appId=252490`
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
            .addField(swapgg.result)

        message.channel.send(swapggembed)

    }
};