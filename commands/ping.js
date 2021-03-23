module.exports = {
  commands: 'ping',
  callback: (message, arguments, text, bot) => {
    message.reply('Calculating ping...').then((resultMessage) => {
      const ping = resultMessage.createdTimestamp - message.createdTimestamp

      resultMessage.edit(`Bot ping: ${ping}, API Latency: ${bot.ws.ping}`)
    })
  },
}
