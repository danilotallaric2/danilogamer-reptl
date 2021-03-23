module.exports = {
    name: 'clear',
    description: "Clear messages!",
   async  execute(message, args) {
   
    if(!message.member.hasPermission('MANAGE_MESSAGES', 'ADMINISTRATOR')) return message.reply(' :x: **Non hai il permesso di utilizarre questo comando!**')
   
        if (!args[0]) return message.reply(" :x: **Inserisci la quantità di messaggi da cancellare!** ")
   
        if(isNaN(args[0])) return message.reply(":x: **Digita un numero reale!** ");
   
        if(args[0] > 200) return message.reply(" :x: **Non puoi rimuovere più di 200 messaggi!** ");
   
        if(args[0] < 1) return message.reply(" :x: **Devi eliminare almeno un messaggio!** ");
   
        await message.channel.messages.fetch({ limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages)
    });
  }
  }