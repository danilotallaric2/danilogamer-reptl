module.exports = {
    name: 'stop',
    description: 'stop the bot and leave the channel',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
 
        if(!voiceChannel) return message.channel.send(" :x: **Devi essere in un canale vocale per interrompere la musica!** ");
        await voiceChannel.leave();
        await message.channel.send(' :white_check_mark: **musica interrotta** :smiling_face_with_tear:')
 
    }
}