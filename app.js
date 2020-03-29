const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs")
require("dotenv")

var prefix = ("?")
var clogs = JSON.parse(fs.readFileSync('./bd/slogs.json', 'utf8'));
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
                if (!msg.member.permissions.has("MANAGE_CHANNELS")) return msg2.edit("<a:attention:690519193287917579>Vous n'avez pas la permission requise.")
                let args = msg.mentions.channels.first();
                if (!args) return msg2.edit(`<a:non:691361782387703818>Erreur de syntaxe.`)

                let ch = args.id
                let serveur = msg.guild.id
                let info = clogs.find(e => e.guild_id === msg.guild.id)
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

                if (msg.member.permissions.has("BAN_MEMBERS")) return msg2.edit("<a:attention:690519193287917579>Vous n'avez pas la permission requise...")

                let mention = msg.mentions.users.first()
                if (!mention) return msg2.edit("<a:non:691361782387703818>Aucun utilisateur mentionné...")


                let arg = msg.content.split(' ').slice(1)
                let raison = args.slice(1).join(' ')
                let r = raison.toLowerCase()


                if (!mention) {
                    try {

                        if (!message.guild.members.get(args.slice(0, 1).join(' ')))

                            mention = message.guild.members.get(args.slice(0, 1).join(' '));
                        mention = mention.user;
                    } catch (error) {
                        return msg2.edit("<a:non:691361782387703818>Aucun utilisateur ou id d 'utilisateur donné!")

                    }
                }
                if (user === message.author) return msg2.edit("<a:non:691361782387703818>Vous ne pouvez pas vous bannir...:face_palm:")
                if (!r) msg2.edit("<a:non:691361782387703818>Aucune raison donné...")
                if (!message.guild.member(user).bannable) return message.reply("<a:non:691361782387703818>Je ne peux pas bannir cet utilisateur...")​

                let embeda = new Discord.RichEmbed()
                    .setAuthor(msg.author.tag)
                    .addField("vous a banni du serveur:", msg.guild.name)
                    .addField("Pour la raison suivante:", r)
                    .setColor("RED")
                    .setTimestamp()
                    .setThumbnail(msg.author.avatarURL)

                mention.user.send(embeda)

                mention.ban({
                    reason: r
                })
                let embeds = new Discord.RichEmbed()
                    .setAuthor(mention.tag)
                    .addField("pour la raison suivante:", r)
                    .addField("Par:", msg.author.tag)
                    .addBlankField()
                    .addField("ID du banni:", mention.id)
                    .setThumbnail(mention.avatarURL)
                    .setColor("RED")
                    .setTimestamp()

                let info = clogs.find(e => e.guild_id === msg.guild.id)
                let channel2 = client.channels.get(info.channel_id)

                channel2.send(embeds)
                msg2.edit("<a:oui:691361629530619915>" + mb.user.tag + " a été banni avec succès!")

            })
    }
})

client.on('guildMemberAdd', member => {
    if (member.guild.id == "682335479978655744") {

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