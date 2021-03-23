const emitterLimit = require('events').EventEmitter.defaultMaxListeners = 1000;
const Discord = require('discord.js');
const client = new Discord.Client();
let bot = client;
const prefix = 'dani!';
const avatarEmbed = require('discord.js-avatar');
const randomPuppy = require('random-puppy');
const fs = require('fs');
const { triggerAsyncId } = require('async_hooks');
const got = require('got');
const pornhub = require('@justalk/pornhub-api');
const url = 'https://www.pornhub.com/view_video.php?viewkey=ph56fc59c124c0c';
const video = pornhub.page(url, ['title','pornstars','download_urls']);
const fetch = require('node-fetch');
const { report } = require('process');
const util = require('minecraft-server-util');
const {GuildMember, Message} = require('discord.js')
const minigames = require('discord-minigames')


bot.once("ready", () => {
    console.log("BOT ONLINE")
    bot.user.setActivity(`dani!help | ${bot.guilds.cache.size} SERVERS | CONTROL ${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} USERS!  `, { type: 'STREAMING' });
    url: "https://twitch.tv/"
    
});


bot.login("NzEzMTMyMjc0NDc2MTIyMTIy.XsbqLw.Nqx2xZL2Q1woSr86QXb-v3G2AhU")


bot.on("message", (message) => {
    if (message.content.startsWith("dani!ban")) {
        var utenteBan = message.mentions.members.first();

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            message.channel.send('**Non hai il permesso**');
            return;
        }

        if (!utenteBan) {
            message.channel.send('Non hai menzionato nessun utente');
            return;
        }

        if (!utenteBan.kickable) {
            message.channel.send('Io non ho il permesso');
            return
        }

        utenteBan.ban()
            .then(() => message.channel.send("<@" + utenteBan + ">" + " è stato bannato / inculato"))

    }
})

bot.on("message", (message) => {
    if (message.content.startsWith("dani!kick")) {
        var utenteKick = message.mentions.members.first();

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            message.channel.send('**Non hai il permesso**');
            return;
        }

        if (!utenteKick) {
            message.channel.send('Non hai menzionato nessun utente');
            return;
        }

        if (!message.mentions.members.first().kickable) {
            message.channel.send('Io non ho il permesso');
            return
        }

        utenteKick.kick()
            .then(() => message.channel.send("<@" + utenteKick + ">" + " è stato kiccato / inculato"))

    }
})

var embed = new Discord.MessageEmbed()
    .setColor("#DC143C")

    .setTitle("HELP BOT")
    .addField("MODERATOR COMMAND", "dani!ban , dani!kick dani!clear ", true)
    .addField("UTENTE COMMAND", "dani!help , dani!invite dani!meme dani!minigame dani!info dani!report dani!ciao dani!say dani!avatar dani!play dani!stop ", true)


    .setTimestamp();
bot.on("message", (message) => {
    if (message.content == "dani!helpwwwwwwwwwwwwwwwwwwwww") {
        message.channel.send(embed)
    }
});

bot.on("message", (message) => {
    if (message.content == "dani!ciao") {
        message.channel.send("Ciao")
            .then(function (message) {
                message.react("😍");
                message.react("✅");
                message.react("😭");
                message.react("😡");
                message.react("🤬");
            })
    }
})

bot.on("message", (message) => {
    if (message.content == "dani!prova") {
        const canaleVocale = message.member.voice.channel;
        if (canaleVocale) {
            canaleVocale.join()
                .then(connection => {
                    connection.play('audio.mp3');
                });
        }
        else {
            message.channel.send("No voice channel.");
        }
    }
})

bot.on("message", (message) => {
    if (message.content == "dani!invite") {
        message.channel.send("**ti ho inviato tutto in privato ✅  **")
            .then(function (message) {
                message.react("✅");
                
            })
    }
})

bot.on("message", (message) => {
    if (message.content == "dani!invite") {
        message.author.send("ecco il mio link di invito spero che vi piace il bot = https://discord.com/oauth2/authorize?client_id=713132274476122122&scope=bot&permissions=2147483647")
    }
});

var minigame = ["🍎🍏🍊", "🍏🍏🍎", "🍊🍎🍏", "🍎🍎🍊", "🍊🍊🍏", "🍎🍎🍎", "🍎🍏🍊", "🍏🍊🍎", "🍏🍏🍊", "🍏🍏🍎", "🍎🍎🍏", "🍎🍎🍊", "🍊🍊🍏", "🍊🍊🍎",]

bot.on("message", (message) => {
    if (message.content == "dani!minigame") {
        var random =  Math.floor(Math.random() * minigame.length)
        message.channel.send("  "+ minigame[random])
    }
});

var info = new Discord.MessageEmbed()
    .setColor("#DC143C")

    .setTitle("INFO BOT")
    .addField("il bot e stato fatto da danilotallaric#2008 per invitare il bot fare dani!invite", true)


    .setTimestamp();
bot.on("message", (message) => {
    if (message.content == "dani!info") {
        message.channel.send(info)
    }
});


bot.on("message", (message) => {
    if (message.content.startsWith(`dani!say`)) {
      var text = message.content.split(' ').slice(1).join(' ');
      if(!text) return message.channel.send('\n**fai dani!say e scrivi un messagio come questo dani!say ciao**')
       message.channel.send(text);
      message.delete();
      message.channel.stopTyping()
     }
});

bot.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    bot.commands.set(command.name, command);
}
 
 


bot.on("message", msg => {
    let user = msg.mentions.users.first()
    if(!user) user = msg.author;
    if(msg.content.startsWith("dani!avatar")){
      const embed = new Discord.MessageEmbed()
        .setTitle("Avatar")
        .setImage(user.displayAvatarURL())
        .setColor("#DC143C")
        .setTimestamp()
        msg.reply(embed)
    }
})
     
    bot.on('message', message =>{
      if(!message.content.startsWith(prefix) || message.author.bot) return;
     
      const args = message.content.slice(prefix.length).split(/ +/);
      const command = args.shift().toLowerCase();
     
      if(command === 'play') {
          bot.commands.get('play').execute(message, args);
      } else if(command === 'stop') {
        bot.commands.get('stop').execute(message, args);
      }  else if(command === 'clear') {
        bot.commands.get('clear').execute(message, args);
      }  else if(command === 'ascii') {
        bot.commands.get('ascii').execute(message, args);
      }
})
var help = new Discord.MessageEmbed()
  .setColor('#DC143C')
  .setTitle('DaniloGamer_BOT Help')
  .setFooter(' Creato da danilotallaric#2008', "https://images-ext-1.discordapp.net/external/TdQEey25Twoh6XABAa07Ntxp08LYQMnYXLjk_XxqDMc/https/cdn.discordapp.com/avatars/662312741670879234/a_ede12b41fe0b6fa949d472749388fdba.webp")
  .setDescription('DaniloGamer_bot è un bot con un sacco di comandi! \n \n per invitare il bot fai `dani!invite` \n \n :police_officer: **Moderazione:** `dani!help mod` \n \n :musical_note: **Vocali:**   `dani!help music` \n \n :laughing: **Fun** `dani!help fun` \n \n :underage: **NSFW** `dani!help nsfw` \n \n :floppy_disk: **INFO** `dani!help info` \n \n')
  .setTimestamp()
  .setThumbnail('https://bit.ly/2H8ykIS')
 
bot.on('message', (message) => {
  if (message.content == 'dani!help') {
    message.channel.send(help);
  }
});

var help2 = new Discord.MessageEmbed()
  .setColor('#DC143C')
  .setTitle('DaniloGamer_BOT Help')
  .setFooter(' Creato da danilotallaric#2008', "https://images-ext-1.discordapp.net/external/TdQEey25Twoh6XABAa07Ntxp08LYQMnYXLjk_XxqDMc/https/cdn.discordapp.com/avatars/662312741670879234/a_ede12b41fe0b6fa949d472749388fdba.webp")
  .setDescription('-------------- \n `dani!ban` \n -------------- \n `dani!kick` \n -------------- \n `dani!clear` \n -------------- \n `dani!say` \n -------------- \n')
  .setTimestamp()
  .setThumbnail('https://bit.ly/2H8ykIS')
 
bot.on('message', (message) => {
  if (message.content == 'dani!help mod') {
    message.channel.send(help2);
  }
});

var help3 = new Discord.MessageEmbed()
  .setColor('#DC143C')
  .setTitle('DaniloGamer_BOT Help')
  .setFooter(' Creato da danilotallaric#2008', "https://images-ext-1.discordapp.net/external/TdQEey25Twoh6XABAa07Ntxp08LYQMnYXLjk_XxqDMc/https/cdn.discordapp.com/avatars/662312741670879234/a_ede12b41fe0b6fa949d472749388fdba.webp")
  .setDescription('-------------- \n `dani!play` \n -------------- \n `dani!stop` \n -------------- \n')
  .setTimestamp()
  .setThumbnail('https://bit.ly/2H8ykIS')
 
bot.on('message', (message) => {
  if (message.content == 'dani!help music') {
    message.channel.send(help3);
  }
});

var help4 = new Discord.MessageEmbed()
  .setColor('#DC143C')
  .setTitle('DaniloGamer_BOT Help')
  .setFooter(' Creato da danilotallaric#2008', "https://images-ext-1.discordapp.net/external/TdQEey25Twoh6XABAa07Ntxp08LYQMnYXLjk_XxqDMc/https/cdn.discordapp.com/avatars/662312741670879234/a_ede12b41fe0b6fa949d472749388fdba.webp")
  .setDescription('-------------- \n `dani!meme` \n -------------- \n `dani!avatar` \n -------------- \n `dani!report` \n -------------- \n `dani!minigame` \n -------------- \n `dani!say` \n -------------- \n `dani!ciao` \n -------------- ')
  .setTimestamp()
  .setThumbnail('https://bit.ly/2H8ykIS')
 
bot.on('message', (message) => {
  if (message.content == 'dani!help fun') {
    message.channel.send(help4);
  }
});

var help5 = new Discord.MessageEmbed()
  .setColor('#DC143C')
  .setTitle('DaniloGamer_BOT Help')
  .setFooter(' Creato da danilotallaric#2008', "https://images-ext-1.discordapp.net/external/TdQEey25Twoh6XABAa07Ntxp08LYQMnYXLjk_XxqDMc/https/cdn.discordapp.com/avatars/662312741670879234/a_ede12b41fe0b6fa949d472749388fdba.webp")
  .setDescription('-------------- \n `dani!porn` \n --------------')
  .setTimestamp()
  .setThumbnail('https://bit.ly/2H8ykIS')

 
bot.on('message', (message) => {
  if (message.content == 'dani!help nsfw') {
    message.channel.send(help5);
  }
});

var help6 = new Discord.MessageEmbed()
  .setColor('#DC143C')
  .setTitle('DaniloGamer_BOT Help')
  .setFooter(' Creato da danilotallaric#2008', "https://images-ext-1.discordapp.net/external/TdQEey25Twoh6XABAa07Ntxp08LYQMnYXLjk_XxqDMc/https/cdn.discordapp.com/avatars/662312741670879234/a_ede12b41fe0b6fa949d472749388fdba.webp")
  .setDescription('-------------- \n `dani!userinfo` \n -------------- \n `dani!serverinfo` \n -------------- \n `dani!servermc` \n --------------\n `dani!ping` \n --------------')
  .setTimestamp()
  .setThumbnail('https://bit.ly/2H8ykIS')

 
bot.on('message', (message) => {
  if (message.content == 'dani!help info') {
    message.channel.send(help6);
  }
});

bot.on("message", (message) => {
    if (message.content === "dani!meme") {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/memes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeDownvotes = content[0].data.children[0].data.downs;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`MEME`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`)
            message.channel.send(embed);
        })
    }
})

bot.on("message", (message) => {
    if (message.content === "dani!serverinfo") {
      const { guild } = message
  
      const { name, region, memberCount, owner, afkTimeout } = guild
      const icon = guild.iconURL()
  
      const serverinfo2 = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Server info  "${name}"`)
        .setThumbnail(icon)
        .addFields(
          {
            name: 'Region',
            value: region,
          },
          {
            name: 'Members',
            value: memberCount,
          },
          {
            name: 'Owner',
            value: owner.user.tag,
          },
          {
            name: 'AFK Timeout',
            value: afkTimeout / 60,
          }
        )
  
      message.channel.send(serverinfo2)
    }
  })
  
  bot.on("message", message => {
    if (message.author.bot) return false;
    if (message.content.toLowerCase() == "dani!porn") {
        if (message.channel.nsfw) {
          var random1 =  Math.floor(Math.random() * porn1.length)
            message.channel.send("  "+ porn1[random1]);
        } else {
            message.channel.send("EHEHEHEHE ZOZZONEEEE, devi essere in un canale nsfw per utilizzare il comando, hihihih");
        }
    }
});
  


var porn1 = ["https://images-ext-2.discordapp.net/external/y5V9b4h3rNxavFA5Oj8kVXz5xeAIHV69iqyJCvkkEZM/https/cdn.boob.bot/Gifs/15F4.gif", "https://cdn.boob.bot/Gifs/17F9.gif", "https://images-ext-2.discordapp.net/external/DfSQVWljEqjYB9ndgvB7yumoH1Xc0ClKL0yjAWSyYVU/https/cdn.boob.bot/Gifs/193F.gif", "https://cdn.boob.bot/Gifs/1938.gif", "https://cdn.boob.bot/Gifs/1837.gif", "https://cdn.boob.bot/Gifs/15CF.gif", "https://images-ext-2.discordapp.net/external/C_m1MFLwB74nR4tyjjmqgT6_61E7RvLOd0mxgOr0dCk/https/cdn.boob.bot/Gifs/1606.gif", "https://cdn.boob.bot/Gifs/16CF.gif", "https://cdn.boob.bot/Gifs/192A.gif", "https://cdn.boob.bot/Gifs/16B6.gif", "https://cdn.boob.bot/Gifs/17EA.gif", "https://cdn.boob.bot/Gifs/17CE.gif", "https://cdn.boob.bot/Gifs/1852.gif", "https://cdn.boob.bot/Gifs/162E.gif", "https://cdn.boob.bot/Gifs/19B5.gif", "https://cdn.boob.bot/Gifs/164C.gif", "https://cdn.boob.bot/Gifs/180E.gif", "https://cdn.boob.bot/Gifs/15EF.gif", "https://cdn.boob.bot/Gifs/1796.gif", "https://cdn.boob.bot/Gifs/17CD.gif", "https://cdn.boob.bot/Gifs/17BC.gif", "https://cdn.boob.bot/Gifs/15E2.gif", "https://cdn.boob.bot/Gifs/16AC.gif", "https://cdn.boob.bot/Gifs/16AC.gif"]

bot.on("message", (message) => {
  if (message.content.startsWith(`dani!report`)) {
    var report2 = message.content.split(' ').slice(1).join(' ');
    if(!report2) return message.channel.send('\n**devi specificare il bug come .... dani!report non va help**');
    var id_canale = bot.channels.cache.get("795024169304981525")
    message.channel.send("Grazie per la tua segnalazione! Lo staff cercherà di risolvere il problema il prima possibile ✅✅✅");
var report4 = new Discord.MessageEmbed()
  .setColor('#DC143C')
  .setTitle('Segnalazione inviata ')
  .setFooter("report sistem")
  .setDescription(`Grazie per la tua segnalazione! Lo staff cercherà di risolvere il problema il prima possibile`)
  .setTimestamp()
  .setThumbnail('')

  var report3 = new Discord.MessageEmbed()
    .setColor('#DC143C')
    .setTitle('Report Bug ')
    .setFooter("Report sistema da DaniloGamer")
    .setDescription(`il bug reportato sta fra paretesi \n \n \n {**${report2}**}`)
    .setTimestamp()
    .setThumbnail('https://cdn.discordapp.com/attachments/816689078397435934/816694490550239344/Logo-Report-Rai3.png')
    id_canale.send(report3);
    message.channel.stopTyping()
   }
});

bot.on("message", message =>{
  if (message.content == 'dani!servermc')
  util.status('DaniloGamer.mcnetwork.me', { port: 25565, enableSRV: true, timeout: 5000, protocolVersion: 47 })
  .then((response) => {
    var data = new Date();
    var ora = data.getHours();
    var minuto = data.getMinutes();
    var giorno = data.getDay();
    var mese = data.getMonth();
    var anno = data.getFullYear();
    var secondo = data.getSeconds();

    const img = ('https://media.discordapp.net/attachments/779751740861186050/817039298066645032/Cattura.PNG')
        const serverinfomc = new Discord.MessageEmbed()
        .setTitle("info server DaniloGamer")
        .setDescription(`online player: **${response.onlinePlayers}**
        max player: **${response.maxPlayers}**
        versione: **${response.version}**
        ip: **${response.host}**`)
        .setColor("#DC143C")
        .setThumbnail(img)
        .setTimestamp()

        return message.channel.send(serverinfomc)
  })
})
 




  bot.on("message", message => {
    if (message.content.startsWith("dani!userinfo")) {
        if (message.content == "dani!userinfo") {
            var utente = message.member;
        }
        else {
            var utente = message.mentions.members.first();
        }

        if (!utente) {
            message.channel.send("Non ho trovato questo utente")
            return
        }

        var elencoPermessi = "";
        if (utente.hasPermission("ADMINISTRATOR")) {
            elencoPermessi = "👑 ADMINISTRATOR";
        }
        else {
            var permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]

            for (var i = 0; i < permessi.length; i++) {
                if (utente.hasPermission(permessi[i])) {
                    elencoPermessi += "- " + permessi[i] + "\r";
                }
            }
        }

        var embed3 = new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription("Tutte le info di questo utente")
            .setThumbnail(utente.user.avatarURL())
            .addField("Utente id", "```" + utente.user.id + "```", true)
            .addField("Stato", "```" + utente.user.presence.status + "```", true)
            .addField("E un bot?", utente.user.bot ? "```Yes```" : "```No```", true)
            .addField("Account creato", "```" + utente.user.createdAt.toDateString() + "```", true)
            .addField("Entrato del server", "```" + utente.joinedAt.toDateString() + "```", true)
            .addField("Permessi", "```" + elencoPermessi + "```", false)
            .addField("Ruoli", "```" + utente.roles.cache.map(ruolo => ruolo.name).join("\r") + "```", false)

        message.channel.send(embed3)

    }
});


    bot.on('message', message => {
        var ping = Date.now() - message.createdTimestamp
         if (message.content === 'dani!ping') {
             var pingembed = new Discord.MessageEmbed()
             .setColor("#DC143C")
             .setTitle("**PING DaniloGamer_bot**")
             .setDescription("ecco il ping: `" + ping + "` " + message.author.toString())
           message.channel.send(pingembed);
          }
        });


