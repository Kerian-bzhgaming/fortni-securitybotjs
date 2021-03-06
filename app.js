const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const ytdl = require('ytdl-core');
require("dotenv");

var prefix = ("?")
var clogs = JSON.parse(fs.readFileSync('./bd/slogs.json', 'utf8'));
var utils = JSON.parse(fs.readFileSync("./bd/util.json", "utf8"));
var c = ["BLACK", "WRITE", "RED", "BLUE", "GREEN", "GREY", "PURPLE", "CYAN"]
var cs = Math.floor((Math.random() * c.length));

client.login(process.env.TOKEN)

client.on("ready", function() {

    console.log("Oui!")

    var MessageTable = [`${client.users.size} utilisateurs`, `Mise à jour en cours!`, `${client.guilds.size} serveurs`]

    var Number = 0

    function RepeatMessage() {
        client.user.setActivity(MessageTable[Number], { type: "WATCHING" })
        if (Number == MessageTable.length - 1) {
            Number = 0
        } else {
            Number++
        }
    }
    setInterval(RepeatMessage, 5000)
})

client.on("message", msg => {
    if (msg.content.startsWith(prefix + "clogs")) {

        msg.channel.send("<a:load:693178886586105896>Veuillez patienter...")
            .then(msg2 => {

                if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg2.edit("<a:attention:690519193287917579>Vous n'avez pas la permission requise.")
                let args = msg.mentions.channels.first();
                if (!args) return msg2.edit(`<a:non:691361782387703818>Erreur de syntaxe.`)

                let ch = args.id
                let serveur = msg.guild.id
                let info = clogs.find(e => e.guild_id === msg.guild.id)
                if (!info.length === 18) return
                if (ch === info.channel_id) return msg2.edit("<a:non:691361782387703818>Ce salon est déjà sauvegardé...")
                clogs.push({ guild_id: serveur, channel_id: ch })
                console.log("yep")
                fs.writeFile('./bd/slogs.json', JSON.stringify(clogs), (err) => {
                    if (err) return msg2.edit(`<a:non:691361782387703818>Une erreur a eu lieu pendant l'écriture des données...`)
                    console.log("Ok")


                })
                let embed = new Discord.RichEmbed()
                    .setAuthor(msg.author.tag)
                    .setTitle("Le salon de sanctions est désormais celui-ci!")
                    .setDescription("Les sanctions appliquées apparaitrons ici!")
                    .setFooter(`Pour modifier ce paramètre faite ${prefix}clogs(NE PAS FAIRE POUR L'INSTANT)`)
                    .setTimestamp()
                    .setThumbnail(`${msg.author.avatarURL}`)
                    .setColor(c[cs])


                //info return ce que je t'ai dit
                let channel2 = client.channels.get(info.channel_id)

                channel2.send(embed)
                msg2.edit("<a:oui:691361629530619915>Salon configuré avec succès! Nous vous demandons de ne pas modifier le salon pour le moment; cette partie de la commande est toujours en développement.")
            })
    }
})

client.on("message", msg => {
    if (msg.content === (`${prefix}ping`)) {
        msg.channel.send("``" + client.ping + "`` Pong!:ping_pong:")
    }

})

client.on("message", msg => {
    if (msg.content.startsWith(`${prefix}ban`)) {

        msg.channel.send("<a:load:693178886586105896>En cours d'éxecution, veuillez patienter...")
            .then(msg2 => {

                if (!msg.member.hasPermission("BAN_MEMBERS")) return msg2.edit("<a:attention:690519193287917579>Vous n'avez pas la permission requise...")

                let user = msg.mentions.users.first()


                let args = msg.content.split(' ').slice(1)
                let raison = args.slice(1).join(' ')
                let r = raison.toLowerCase()


                if (!user) {
                    try {

                        if (!msg.guild.members.get(args.slice(0, 1).join(' ')))

                            user = msg.guild.members.get(args.slice(0, 1).join(' '));

                    } catch (error) {
                        return msg2.edit("<a:non:691361782387703818>Aucun utilisateur ou id d'utilisateur donné!")

                    }
                }
                if (user === msg.author) return msg2.edit("<a:non:691361782387703818>Vous ne pouvez pas vous bannir...:face_palm:")
                if (!r) msg2.edit("<a:non:691361782387703818>Aucune raison donné...")
                if (!msg.guild.member(user).bannable) return msg2.edit("<a:non:691361782387703818>Je ne peux pas bannir cet utilisateur...")​

                let embeda = new Discord.RichEmbed()
                    .setAuthor(msg.author.tag)
                    .addField("vous a banni du serveur:", msg.guild.name)
                    .addField("Pour la raison suivante:", r)
                    .setColor("RED")
                    .setTimestamp()
                    .setThumbnail(msg.author.avatarURL)

                ban: {
                    user.send(embeda),

                    msg.guild.member(user).ban({
                        reason: r

                    })
                }


                let embeds = new Discord.RichEmbed()
                    .setAuthor(user.tag)
                    .addField("pour la raison suivante:", r)
                    .addField("Par:", msg.author.tag)
                    .addBlankField()
                    .addField("ID du banni:", user.id)
                    .setThumbnail(user.avatarURL)
                    .setColor("RED")
                    .setTimestamp()

                let info = clogs.find(e => e.guild_id === msg.guild.id)
                let channel2 = client.channels.get(info.channel_id)

                channel2.send(embeds)
                msg2.edit("<a:oui:691361629530619915>" + user.tag + " a été banni avec succès!<a:temp_ban:690521750659924029>")
            })
    }
})

client.on('guildMemberAdd', member => {
    if (member.guild.id == "682335479978655744") {
        let cs = Math.floor((Math.random() * c.length));
        let embed = new Discord.RichEmbed()

        .setTitle("Bienvenue " + member.user.tag + " !!!!!!!!!!")
            .setDescription("sur " + member.guild.name + ", maintenant nous sommes " + member.guild.memberCount + " personnes")
            .setFooter("Tu as rejoins à:")
            .setTimestamp()
            .setColor(c[cs])
        member.addRole("682337868605030470")
        client.channels.get("682337944085856301").send(embed)
        client.channels.get("682337964260458606").send(member.user.tag + " vient d'arriver, dite lui bienvenue!")
    }

})

client.on("message", msg => {
    if (msg.content === (`${prefix}utilisations`)) {
        msg.reply("En cours de développement:wink:")
    }
})

client.on("message", msg => {
    if (msg.content.startsWith(`${prefix}send`)) {

        msg.channel.send("<a:load:693178886586105896>En cours d'éxecution, veuillez patienter...")
            .then(msg2 => {

                let user = msg.mentions.users.first()



                let args = msg.content.split(' ').slice(1)
                let raison = args.slice(1).join(' ')
                let r = raison.toLowerCase()


                if (!user) {
                    try {

                        if (!msg.guild.members.get(args.slice(0, 1).join(' ')))

                            user = msg.guild.members.get(args.slice(0, 1).join(' '));
                        user = user.user;
                    } catch (error) {
                        return msg2.edit("<a:non:691361782387703818>Aucun staff du bot ou id donné!")

                    }
                }
                if (user === msg.author) return msg2.edit("<a:non:691361782387703818>Vous ne pouvez pas vous envoyez un message...:face_palm:")
                if (!r) msg2.edit("<a:non:691361782387703818>Aucun message donné...")

                let cs = Math.floor((Math.random() * c.length));
                let embed = new Discord.RichEmbed()
                    .setAuthor(msg.author.tag)
                    .setTitle("Vous envoi:")
                    .setDescription(r)
                    .setTimestamp()
                    .setThumbnail(msg.author.avatarURL)
                    .setColor(c[cs])
                    .setFooter("Vous ne pouvez pas encore lui répondre")

                user.send(embed)
            })
    }
})

client.on("message", msg => {
    if (msg.guild) return
    if (msg.author.bot) return
    let cs = Math.floor((Math.random() * c.length));
    let embed = new Discord.RichEmbed()
        .setAuthor(msg.author.tag)
        .setTitle("A dit au bot")
        .setDescription(msg.content)
        .setFooter("Eh oui les cons ça existe")
        .setTimestamp()
        .setThumbnail(msg.author.avatarURL)
        .setColor(c[cs])

    client.users.get("415148210156470272").send(embed)
    client.users.get("454342163443220501").send(embed)
})



client.on("message", msg => {
    if (msg.content.startsWith(prefix + "setup")) {

        msg.channel.send("<a:load:693178886586105896>Veuillez patienter...")
            .then(msg2 => {

                //clogs.push({ guild_id: msg.guild.id, serveur: msg.guild.name, uses: +1 })
                fs.writeFile("./bd/util.json", JSON.stringify(utils), err => {
                    if (err) return msg2.edit("Uh oh! Une erreur est survenu leur du setup...:confused:")
                })

                msg2.edit("Terminé avec succès!")
                let guilduses = utils.find(e => e.guild_id === msg.guild.id);
                let ut = guilduses.uses
                let gg = new Discord.RichEmbed()
                    .setTitle("Bravo vous venez de gagner une utilisation!")
                    .setDescription("Pour vous expliquez en quelques détails, les utilisations servent à débloquer les autres commandes!")
                    .addField("Voici votre nombre d'utilisations:", ut)
                    .setColor(c[cs])
                    .setThumbnail(msg.author.avatarURL)
                    .setImage(msg.guild.bannerURL)
                msg.channel.send(gg)

            })
    }
})

client.on("message", msg => {
    if (msg.content.startsWith(`${prefix}play`)) {
        if (!msg.member.voiceChannel) return msg.channel.send("Veuillez vous connectez dans un salon vocal.")
        if (msg.guild.me.voiceChannel) return msg.channel.send("Uh oh! Je suis déjà dans un salon vocal...")
        let args = msg.content.split(" ")
        if (!args[0]) return msg.channel.send("Aucun lien donné...")

        let validate = ytdl.validateURL(args[0])
        if (!validate) return msg.channel.send("Uh oh! Ce n'est pas un lien valide...")

        let info = ytdl.getInfo(args[1])

        msg.member.join()

        let dispatcher = connection.play((info.url))

        msg.channel.send(`Vous écoutez désormais ${info.title}`)
    }
})

client.music = require("discord.js-musicbot-addon");
client.music.start(client, {
    youtubeKey: fortni - security,
    botPrefix: '?'
});