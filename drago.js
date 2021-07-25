const Discord = require("discord.js");
const {
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MEMBERS"],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
const {
  AvArow,
  avalist,
  row,
  tankRow,
  healRow,
  dpsList,
  healList,
  list,
} = require("./list");
const mongo = require("./mongo");
const splitz = require("./models/split-schema");
const person = require("./models/person");
const regear = require("./models/regear");
const report = require("./models/report");
const register = require("./models/register");
const axios = require("axios");
const prefix = "!";
const blacklist = require("./models/blacklist");
const database = require("mongoose");
const rep = require("./models/reputation");
const {
  dateMaker,
  compareSet,
  sets,
  billboard,
  nicknameMaker,
} = require("./functions");
let { recentlyRan } = require("./cooldown");
let repLogButton = new MessageButton()
  .setStyle("LINK")
  .setLabel("Message Link");
const fs = require("fs");
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
const { cooldowns } = client;
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (message.channel.id === "752110992405692456") {
    if (message.content.toLowerCase().includes("my in-game name:")) {
      let personIGN = message.content.replace("\n", " ").split(/ +/g);
      const startIndex =
        personIGN.findIndex((i) => i.toLowerCase() === "name:") + 1;
      const endIndex = startIndex + 1;
      console.log(personIGN);
      console.log(personIGN.slice(startIndex, endIndex));
      message.member.setNickname(
        personIGN.slice(startIndex, endIndex).toString()
      );
    } else if (message.content.toLowerCase().includes("ign")) {
      let personIGN = message.content.replace("\n", " ").split(/ +/g);
      const startIndex =
        personIGN.findIndex((i) => i.toLowerCase() === "ign:") + 1;
      const endIndex = startIndex + 1;
      console.log(personIGN);
      console.log(personIGN.slice(startIndex, endIndex));
      message.member.setNickname(
        personIGN.slice(startIndex, endIndex).toString()
      );
    }
  }
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  if (
    message.content.toLowerCase().includes("thanks") |
    message.content.toLowerCase().includes("thank you") |
    message.content.toLowerCase().includes("thx")
  ) {
    if (message.channel.id === "722753194496753745") return;
    await mongo().then(async (mongoose) => {
      if (!message.mentions.members) return;
      let logChannel = message.guild.channels.cache.get("864669032811331584");
      if (recentlyRan.includes(message.author.id)) return;
      let personID;
      let isPersonHasRep;
      let guildNickname;
      let mentionsNumber = message.mentions.members.map((e) => e.user.id);
      console.log(mentionsNumber.length);
      if (mentionsNumber.includes(message.author.id)) return;
      console.log("should be stopped here after the return statement");
      if (mentionsNumber.length > 3) return;
      console.log("Should be stopped");
      if (mentionsNumber.length > 1 && mentionsNumber.length < 4) {
        let theMap = message.mentions.members;
        let mentionArray = [];
        let array = theMap.map((m) => m.user.id);
        var bar = new Promise((resolve, reject) => {
          array.forEach(async (m, index) => {
            console.log(m);
            let guildNickname = (await message.guild.members.fetch()).get(
              m
            ).displayName;
            isPersonHasRep = await rep.findOne({ id: m });

            if (isPersonHasRep) {
              await isPersonHasRep.updateOne({
                rep: parseInt(isPersonHasRep.rep) + 1,
              });
            } else {
              await rep.create({
                name: guildNickname,
                id: m,
                rep: "1",
              });
            }
            let personData = await rep.findOne({ id: m });
            mentionArray.push(personData.name);
            console.log(m, mentionArray, theMap.map((m) => m.id).length, index);
            if (index === array.length - 1) resolve();
          });
        });
        bar.then(async () => {
          let finalString = mentionArray.map((m) => "**" + m + "**").join(", ");
          console.log(finalString);
          message.reply({
            content: `Gave \`1\` **Rep** to ${finalString} at the same time!`,
          });
          recentlyRan.push(message.author.id);
          setTimeout(() => {
            recentlyRan = recentlyRan.filter(
              (string) => string !== message.author.id
            );
          }, 420000);
          logChannel.send({
            content: `**${nicknameMaker(
              message,
              message.author.id
            )}** has given \`1\` Rep to ${finalString} in <#${
              message.channel.id
            }> at ${dateMaker(new Date())}`,
            components: [[repLogButton.setURL(message.url)]],
          });
        });
      } else {
        let firstArgument = args[0];
        let person = message.mentions.members.first().user;
        guildNickname = nicknameMaker(message, person.id);
        personID = person.id;
        isPersonHasRep = await rep.findOne({ id: person.id });

        if (isPersonHasRep) {
          await isPersonHasRep.updateOne({
            rep: parseInt(isPersonHasRep.rep) + 1,
          });
        } else {
          await rep.create({
            name: guildNickname.toLowerCase(),
            id: personID,
            rep: "1",
          });
        }
        let personData = await rep.findOne({ id: personID });
        let blabla =
          (await (
            await rep.find().sort({ rep: -1 })
          ).findIndex((i) => i.id === personID)) + 1;
        recentlyRan.push(message.author.id);
        message.channel.send({
          content: `Gave \`1\` Rep to **${guildNickname}** (current: \`#${blabla}\` -\`${personData.rep}\`)`,
        });
        setTimeout(() => {
          recentlyRan = recentlyRan.filter(
            (string) => string !== message.author.id
          );
        }, 420000);
        logChannel.send({
          content: `**${nicknameMaker(
            message,
            message.author.id
          )}** has given \`1\` Rep to **${personData.name}** in <#${
            message.channel.id
          }> at ${dateMaker(new Date())}`,
          components: [[repLogButton.setURL(message.url)]],
        });
      }
    });
  }
  const command = args.shift().toLowerCase();
  const commands = client.commands.get(command);
  //if (!message.content.startsWith(prefix)) return;
  if (!message.content.toLowerCase().startsWith(prefix)) return;
  //if (!client.commands.has(command)) return;
  if (commands.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(commands.permissions)) {
      return message.reply("You dont have the right to use this command");
    }
  }
  try {
    client.commands.get(command).execute(message, args, client);
  } catch (error) {
    console.log("A person didnt follor the cor");
  }
  if (command === "fastcheck") {
    const eventId = args[0];
    if (!eventId) return message.reply("Please state the event Id");
    axios
      .get(`https://gameinfo.albiononline.com/api/gameinfo/events/${eventId}`)
      .then(async (result) => {
        let event = result.data;
        const embed = new MessageEmbed()
          .setAuthor("Killboard Info", client.user.displayAvatarURL())
          .setColor("BLUE")
          .setDescription(
            `List to fast check killboard \n[Killboard link](https://albiononline.com/en/killboard/kill/${eventId}) \n**Deathfame:** ${
              parseInt(event.TotalVictimKillFame) / 1000
            }`
          )
          .addFields(
            {
              name: "__**Victim**__",
              value: `**Name:** ${
                event.Victim.Name
              } \n**Average IP:** ${Math.round(
                event.Victim.AverageItemPower
              )} \n**Guild:** ${event.Victim.GuildName} \n**Aliance:** ${
                event.Victim.AllianceName
              }`,
              inline: true,
            },
            {
              name: "__**Killer**__",
              value: `**Name:** ${
                event.Killer.Name
              } \n**Average IP:** ${Math.round(
                event.Killer.AverageItemPower
              )} \n**Guild:** ${event.Killer.GuildName} \n**Alliance:** ${
                event.Killer.AllianceName
              }`,
              inline: true,
            }
          )
          .setFooter("Singapore on top", client.user.displayAvatarURL())
          .setTimestamp(new Date());
        message.channel.send(embed);
        console.log(event);
      })
      .catch((e) => {
        message.channel.send("Cannot find a killboard with that id");
      });
  } else if (command === "deletecommand") {
    if (message.member.permissions.has("ADMINISTRATOR")) {
      if (!args[0]) return message.reply("Please state the command name");
      let commandList = await client.application?.commands.fetch();
      console.log(await client.application?.commands.fetch());
      if (commandList) {
        await client.application?.commands.delete(args[0]);
        message.reply(`Command \`${args[0]}\` has been deleted`);
      } else {
        message.reply(`I couldn't find a command with \`${args[0]}\` name`);
      }
    }
  }
  Object.keys(avalist).forEach((m, i) => {
    if (command.includes(m)) {
      let botCommandChannel =
        message.guild.channels.cache.get("760731834354499585");
      if (
        (message.channel.id === "760731834354499585") |
        (message.channel.id === "779514684797091850") |
        message.member.roles.cache.has("759793776439984170") |
        message.member.permissions.has("ADMINISTRATOR")
      ) {
        let listButton = new MessageButton()
          .setCustomID("listbutton")
          .setStyle("SUCCESS")
          .setLabel("Look for more builds!")
          .setEmoji("<:jennielove:844893922634235904>");
        let embed = new MessageEmbed()
          .setAuthor(avalist[m].name, avalist[m].icon)
          .setColor("ORANGE")
          .setImage(avalist[m].pic)
          .setDescription(avalist[m].string)
          .setFooter(
            `Requested by ${
              Boolean(
                message.guild.members.cache.get(message.author.id).nickname
              )
                ? message.guild.members.cache.get(message.author.id).nickname
                : message.author.username
            }`,
            message.author.displayAvatarURL()
          );
        message.channel.send({
          content: "Processing...",
          embeds: [embed],
          components: [[listButton]],
        });
      } else {
        message.reply(`Please redo this command at ${botCommandChannel}`);
      }
    }
  });
  Object.keys(list).forEach((m, i) => {
    if (command.includes(m)) {
      let botCommandChannel =
        message.guild.channels.cache.get("760731834354499585");
      if (
        (message.channel.id === "760731834354499585") |
        (message.channel.id === "779514684797091850") |
        message.member.roles.cache.has("759793776439984170") |
        message.member.permissions.has("ADMINISTRATOR")
      ) {
        let zvzlistButton = new MessageButton()
          .setCustomID("listbuttonzvz")
          .setStyle("SUCCESS")
          .setLabel("Look for more builds!")
          .setEmoji("<:jennielove:844893922634235904>");
        let referenceButton = new MessageButton()
          .setStyle("LINK")
          .setURL(list[m][2])
          .setLabel("ARCH main discord reference");
        let embed = new MessageEmbed()
          .setAuthor(
            `'zl [SING] ${
              Boolean(
                message.guild.members.cache.get(message.author.id).nickname
              )
                ? message.guild.members.cache.get(message.author.id).nickname
                : message.author.username
            }`,
            message.author.displayAvatarURL()
          )
          .setColor("ORANGE")
          .setImage(list[m][0])
          .setDescription("You must reach at least 1100 IP")
          .setFooter(
            `Requested by ${
              Boolean(
                message.guild.members.cache.get(message.author.id).nickname
              )
                ? message.guild.members.cache.get(message.author.id).nickname
                : message.author.username
            }`,
            message.author.displayAvatarURL()
          );
        message.channel.send({
          content: "Processing...",
          embeds: [embed],
          components: [[zvzlistButton, referenceButton]],
        });
      } else {
        message.reply(`Please redo this command at ${botCommandChannel}`);
      }
    }
  });
  Object.keys(dpsList).forEach((m, i) => {
    if (command.includes(m)) {
      let botCommandChannel =
        message.guild.channels.cache.get("760731834354499585");
      if (
        (message.channel.id === "760731834354499585") |
        (message.channel.id === "779514684797091850") |
        message.member.roles.cache.has("759793776439984170") |
        message.member.permissions.has("ADMINISTRATOR")
      ) {
        let zvzlistButton = new MessageButton()
          .setCustomID("listbuttonzvz")
          .setStyle("SUCCESS")
          .setLabel("Look for more builds!")
          .setEmoji("<:jennielove:844893922634235904>");
        let referenceButton = new MessageButton()
          .setStyle("LINK")
          .setURL(dpsList[m][2])
          .setLabel("ARCH main discord reference");
        let embed = new MessageEmbed()
          .setAuthor(
            `'zl [SING] ${
              Boolean(
                message.guild.members.cache.get(message.author.id).nickname
              )
                ? message.guild.members.cache.get(message.author.id).nickname
                : message.author.username
            }`,
            message.author.displayAvatarURL()
          )
          .setColor("ORANGE")
          .setImage(dpsList[m][0])
          .setDescription("You must reach at least 1100 IP")
          .setFooter(
            `Requested by ${
              Boolean(
                message.guild.members.cache.get(message.author.id).nickname
              )
                ? message.guild.members.cache.get(message.author.id).nickname
                : message.author.username
            }`,
            message.author.displayAvatarURL()
          );
        message.channel.send({
          content: "Processing...",
          embeds: [embed],
          components: [[zvzlistButton, referenceButton]],
        });
      } else {
        message.reply(`Please redo this command at ${botCommandChannel}`);
      }
    }
  });
  Object.keys(healList).forEach((m, i) => {
    if (command.includes(m)) {
      let botCommandChannel =
        message.guild.channels.cache.get("760731834354499585");
      if (
        (message.channel.id === "760731834354499585") |
        (message.channel.id === "779514684797091850") |
        message.member.roles.cache.has("759793776439984170") |
        message.member.permissions.has("ADMINISTRATOR")
      ) {
        let zvzlistButton = new MessageButton()
          .setCustomID("listbuttonzvz")
          .setStyle("SUCCESS")
          .setLabel("Look for more builds!")
          .setEmoji("<:jennielove:844893922634235904>");
        let referenceButton = new MessageButton()
          .setStyle("LINK")
          .setURL(healList[m][2])
          .setLabel("ARCH main discord reference");
        let embed = new MessageEmbed()
          .setAuthor(
            `'zl [SING] ${
              Boolean(
                message.guild.members.cache.get(message.author.id).nickname
              )
                ? message.guild.members.cache.get(message.author.id).nickname
                : message.author.username
            }`,
            message.author.displayAvatarURL()
          )
          .setColor("ORANGE")
          .setImage(healList[m][0])
          .setDescription("You must reach at least 1100 IP")
          .setFooter(
            `Requested by ${
              Boolean(
                message.guild.members.cache.get(message.author.id).nickname
              )
                ? message.guild.members.cache.get(message.author.id).nickname
                : message.author.username
            }`,
            message.author.displayAvatarURL()
          );
        message.channel.send({
          content: "Processing...",
          embeds: [embed],
          components: [[zvzlistButton, referenceButton]],
        });
      } else {
        message.reply(`Please redo this command at ${botCommandChannel}`);
      }
    }
  });
});

client.on("guildMemberAdd", (member) => {
  member.send(
    `**[ARCH] Singapore are recruiting for S13** \nSingapore is not only open to Singaporeans if you're wondering and we're looking for players from all over the WORLD who would like to look for content within Albion during all time zone. **12 to 15 UTC** is our prime time. We mainly speak English in game but we do speak other languages as well as we have players across SEA. \n\n**What we offer:** \n**PvE Content:** \n:one: Fame Farming efficiently in T8 Zones (solo, group and ava dungeons). \n:two: Safe Gathering Zones with multiple hideouts in the black zone. \n:three: Daily Avalonian Buff, Full Clear 8.2+ \n:four: Hideout in T8 Zone. \n:five: Gathering Contents in Royals & Roads. \n:six: Tax Rebate for HCE players. \n:free: Weekly Give Away : **8.3 Gears & Mounts** \n\n**PvP Content:** \n\👍 Daily Police & Ganking Sessions \n\👍 Organized Faction Fights \n\👍 Organized Scrims for Practice \n\👍 Mandatory ZvZ when needed \n\n**Minimum Requirements:** \n:heart: 10M PvE Fame \n:heart:Mature \n:heart:Willing to Learn \n:heart:Able to speak and understand basic English \n\n**Do join our discord at** https://discord.gg/yXRWK8WDct \nApply at application and read rules & react after being accepted. \n**Thank you very much!**`
  );
});
client.on("interaction", async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customID === "back") {
      if (interaction.replied) {
        interaction.editReply({
          content: "ZvZ build list! According to ARCH main zvz gears",
          components: [row, tankRow, healRow],
        });
      } else {
        let deleteButton = new MessageButton()
          .setStyle("DANGER")
          .setCustomID("delete")
          .setLabel("Delete")
          .setEmoji("🚨");
        interaction.update({
          content: "ZvZ build list! According to ARCH main zvz gears",
          components: [row, tankRow, healRow, [deleteButton]],
          embeds: [],
        });
      }
    } else if (interaction.customID === "delete") {
      interaction.message.delete();
    } else if (interaction.customID === "register") {
      let registerButton = new MessageButton()
        .setCustomID("register")
        .setStyle("SUCCESS")
        .setEmoji("✅")
        .setLabel("I have read all the rules");
      let permissionGiven = new MessageButton()
        .setLabel("Permission Given!")
        .setCustomID("permissiongiven")
        .setDisabled(true)
        .setEmoji("🔓")
        .setStyle("PRIMARY");
      let role = interaction.guild.roles.cache.get("706471167971557447");
      let recruitRole = interaction.guild.roles.cache.get("849947414508863519");
      let botCommandChannel =
        interaction.guild.channels.cache.get("752110992405692456");
      let welcomeChannel =
        interaction.guild.channels.cache.get("742733429132754975");
      interaction.member.roles.add(recruitRole);
      if (
        interaction.member.roles.cache.has("706471167971557447") |
        interaction.member.roles.cache.has("849947414508863519")
      ) {
        return interaction.reply({
          content: "You have already signed up! Please dont joke around!",
          ephemeral: true,
        });
      }
      interaction.user.send({
        content: `Permission Given!, Please post your application at ${botCommandChannel} \nPlease refer to ${welcomeChannel} for application instruction! \n\nPlease remember that **after you have joined the guild** you **MUST** register in ARCH Main Discord by typing \`!register\` in #register-here. If we found out that you were not registered, we will kick you :D`,
        files: ["https://i.imgur.com/9gsA1SO.png"],
      });

      interaction.update({
        components: [[permissionGiven]],
      });
      setTimeout(() => {
        interaction.editReply({
          components: [[registerButton]],
        });
      }, 1500);
    } else if (interaction.customID === "avabuildsbutton") {
      const closeButton = new MessageButton()
        .setCustomID("closebutton")
        .setEmoji("❌")
        .setLabel("Close")
        .setStyle("DANGER");
      const homeButton = new MessageButton()
        .setCustomID("home")
        .setEmoji("🏘️")
        .setLabel("Home")
        .setStyle("PRIMARY");
      interaction.update({
        embeds: [],
        content: "Listing avalonian builds...",
        components: [AvArow, [homeButton, closeButton]],
      });
    } else if (interaction.customID === "closebutton") {
      interaction.message.delete();
    } else if (interaction.customID === "home") {
      const listButton = new MessageButton()
        .setCustomID("avabuildsbutton")
        .setEmoji("🚀")
        .setLabel("Ava builds")
        .setStyle("SUCCESS");
      const closeButton = new MessageButton()
        .setCustomID("closebutton")
        .setEmoji("❌")
        .setLabel("Close")
        .setStyle("DANGER");
      let embed = new MessageEmbed()
        .setColor("ORANGE")
        .setAuthor("Singapore Ava Slave", client.user.displayAvatarURL())
        .setTitle("Introduction...")
        .setDescription(
          `Avalonian Elite Dungeon is a difficult dungeon which can only be finished with 20 men. \nYou can only find the **Avalonian Elite Dungeon** around the outlands, you can also find **Avalonian Elite Dungeon** inside the Avalonian Roads as well. The tier starts from T6. \n\nHowever, finding a natural spawn dungeon is a little bit difficult, that's why people used to pop it from a map. \nIn Singapore guild we always do **8.2+ Avalonian Elite Dungeon** that's why you are expected to wear **8.3 gears** and hit at least **1650 IP**. \n\nAs for the shape of the dungeon entrance is like the image below `
        )
        .setImage("https://i.imgur.com/vjQoBtm.png")
        .setFooter("Singapore", client.user.displayAvatarURL());
      interaction.update({
        embeds: [embed],
        components: [[listButton, closeButton]],
      });
    } else if (interaction.customID === "listbutton") {
      const closeButton = new MessageButton()
        .setCustomID("closebutton")
        .setEmoji("❌")
        .setLabel("Close")
        .setStyle("DANGER");
      const homeButton = new MessageButton()
        .setCustomID("home")
        .setEmoji("🏘️")
        .setLabel("Home")
        .setStyle("PRIMARY");
      interaction.update({
        components: [AvArow, [closeButton]],
      });
    } else if (interaction.customID === "refreshbutton") {
      await mongo().then(async (mongoose) => {
        let datta = await rep.find().sort({ rep: -1 }).limit(15);
        let pointsMap = datta.map((m) => m.rep).join("\n");
        let nameMap = datta.map((m) => m.name).join("\n");
        let rankMap = datta
          .map(function (element, index) {
            return "**" + "#" + (parseInt(index) + 1) + "**";
          })
          .join("\n");
        let thisbutton = new MessageButton()
          .setStyle("PRIMARY")
          .setEmoji("🔄")
          .setCustomID("refreshbutton")
          .setLabel("Refresh");
        const embed = new MessageEmbed()
          .setColor("ORANGE")
          .setDescription(
            "**Reputation Leaderboard!** \n**Syntax:** \n`!+rep [playerMention]` \n`!giverep [playerMention]` \n`thanks/thx/ty/thankyou [playerMentionS]`\n"
          )
          .setAuthor("Singapore Love Guardian", client.user.displayAvatarURL())
          .setThumbnail("https://i.imgur.com/GHJ9FLw.png")
          .addFields(
            { name: "**Rank**", value: rankMap, inline: true },
            { name: "**Name**", value: nameMap, inline: true },
            { name: "**Points**", value: pointsMap, inline: true }
          )
          .setFooter("Click the refresh button below to refresh the list!");
        interaction.update({
          embeds: [embed],
          components: [[thisbutton]],
        });
      });
    }
  } else if (interaction.isSelectMenu()) {
    if (interaction.customID === "dps") {
      Object.keys(dpsList).forEach((m, i) => {
        if (interaction.values.includes(m)) {
          let embed = new MessageEmbed()
            .setColor("ORANGE")
            .setAuthor(
              "'zl [SING] LongLiveLuai",
              client.user.displayAvatarURL()
            )
            .setImage(dpsList[m][0])
            .setFooter("According to ARCH main discord zvz gears");
          let button = new MessageButton()
            .setStyle("LINK")
            .setURL(dpsList[m][1])
            .setLabel("Link to the Website");
          let buttonback = new MessageButton()
            .setStyle("SUCCESS")
            .setCustomID("back")
            .setLabel("Back to the List")
            .setEmoji("🚀");
          let deleteButton = new MessageButton()
            .setStyle("DANGER")
            .setCustomID("delete")
            .setLabel("Delete this message")
            .setEmoji("🚨");
          let referenceButton = new MessageButton()
            .setStyle("LINK")
            .setURL(dpsList[m][2])
            .setLabel("ARCH main discord reference");
          if (interaction.replied) {
            interaction.editReply({
              content: "Hold on",
              components: [[button, buttonback, referenceButton, deleteButton]],
              embeds: [embed],
            });
          } else {
            interaction.update({
              content: "Hold on",
              components: [[button, buttonback, referenceButton, deleteButton]],
              embeds: [embed],
            });
          }
        }
      });
    } else if (interaction.customID === "tanks") {
      Object.keys(list).forEach((m, i) => {
        if (interaction.values.includes(m)) {
          let embed = new MessageEmbed()
            .setColor("ORANGE")
            .setAuthor(
              "'zl [SING] LongLiveLuai",
              client.user.displayAvatarURL()
            )
            .setImage(list[m][0])
            .setFooter("According to ARCH main discord zvz gears");
          let button = new MessageButton()
            .setStyle("LINK")
            .setURL(list[m][1])
            .setLabel("Link to the Website");
          let buttonback = new MessageButton()
            .setStyle("SUCCESS")
            .setCustomID("back")
            .setLabel("Back to the List")
            .setEmoji("🚀");
          let deleteButton = new MessageButton()
            .setStyle("DANGER")
            .setCustomID("delete")
            .setLabel("Delete this message")
            .setEmoji("🚨");
          let referenceButton = new MessageButton()
            .setStyle("LINK")
            .setURL(list[m][2])
            .setLabel("ARCH main discord reference");
          if (interaction.replied) {
            interaction.editReply({
              content: "Hold on",
              components: [[button, buttonback, referenceButton, deleteButton]],
              embeds: [embed],
            });
          } else {
            interaction.update({
              content: "Hold on",
              components: [[button, buttonback, referenceButton, deleteButton]],
              embeds: [embed],
            });
          }
        }
      });
    } else if (interaction.customID === "heals") {
      Object.keys(healList).forEach((m, i) => {
        if (interaction.values.includes(m)) {
          let embed = new MessageEmbed()
            .setColor("ORANGE")
            .setAuthor(
              "'zl [SING] LongLiveLuai",
              client.user.displayAvatarURL()
            )
            .setImage(healList[m][0])
            .setFooter("According to ARCH main discord zvz gears");
          let button = new MessageButton()
            .setStyle("LINK")
            .setURL(healList[m][1])
            .setLabel("Link to the Website");
          let buttonback = new MessageButton()
            .setStyle("SUCCESS")
            .setCustomID("back")
            .setLabel("Back to the List")
            .setEmoji("🚀");
          let deleteButton = new MessageButton()
            .setStyle("DANGER")
            .setCustomID("delete")
            .setLabel("Delete this message")
            .setEmoji("🚨");
          let referenceButton = new MessageButton()
            .setStyle("LINK")
            .setURL(healList[m][2])
            .setLabel("ARCH main discord reference");
          if (interaction.replied) {
            interaction.editReply({
              content: "Hold on",
              components: [[button, buttonback, referenceButton, deleteButton]],
              embeds: [embed],
            });
          } else {
            interaction.update({
              content: "Hold on",
              components: [[button, buttonback, referenceButton, deleteButton]],
              embeds: [embed],
            });
          }
        }
      });
    } else if (interaction.customID === "avabuilds") {
      Object.keys(avalist).forEach((m, i) => {
        if (interaction.values.includes(m)) {
          let embed = new MessageEmbed()
            .setAuthor(avalist[m].name, avalist[m].icon)
            .setColor("ORANGE")
            .setImage(avalist[m].pic)
            .setDescription(avalist[m].string)
            .setFooter(
              `Requested by ${
                Boolean(
                  interaction.guild.members.cache.get(interaction.user.id)
                    .nickname
                )
                  ? interaction.guild.members.cache.get(interaction.user.id)
                      .nickname
                  : interaction.user.username
              }`,
              interaction.user.displayAvatarURL()
            );
          interaction.update({
            content: "Processing...",
            embeds: [embed],
          });
        }
      });
    }
  } else if (interaction.isCommand()) {
    if (interaction.commandName === "zvz-builds") {
      if (
        (interaction.channel.id === "760731834354499585") |
        (interaction.channel.id === "779514684797091850") |
        interaction.member.roles.cache.has("759793776439984170") |
        interaction.member.permissions.has("ADMINISTRATOR")
      ) {
        let deleteButton = new MessageButton()
          .setStyle("DANGER")
          .setCustomID("delete")
          .setLabel("Delete")
          .setEmoji("🚨");
        await interaction.reply({
          content: "ZvZ build List! according to ARCH official zvz builds",
          components: [row, tankRow, healRow, [deleteButton]],
        });
      }
    } else if (interaction.commandName === "rep") {
      if (
        (interaction.channelID === "840239735129767997") |
        (interaction.channelID === "752110992405692456")
      )
        return;
      await mongo().then(async (mongoose) => {
        let isPersonHasReputation;
        const blabla = interaction.options.get("user");
        if (interaction.options.get("user")) {
          const { user } = interaction.options.get("user");
          isPersonHasReputation = await rep.findOne({ id: user.id });
          if (!isPersonHasReputation) {
            interaction.reply({
              content: `**${nicknameMaker(
                interaction,
                user.id
              )}**: 0 **Rep** (#**#ω**)`,
            });
          } else {
            let blabla =
              (await (
                await rep.find().sort({ rep: -1 })
              ).findIndex((i) => i.id === user.id)) + 1;
            interaction.reply({
              content: `**${isPersonHasReputation.name}**: ${isPersonHasReputation.rep} **Rep** (**#${blabla}**)`,
            });
          }
        } else {
          isPersonHasReputation = await rep.findOne({
            id: interaction.member.id,
          });
          if (!isPersonHasReputation) {
            interaction.reply({
              content: `**${nicknameMaker(
                interaction,
                interaction.member.id
              )}**: 0 **Rep** (#**#ω**)`,
            });
          } else {
            let blabla =
              (await (
                await rep.find().sort({ rep: -1 })
              ).findIndex((i) => i.id === interaction.member.id)) + 1;
            interaction.reply({
              content: `**${isPersonHasReputation.name}**: ${isPersonHasReputation.rep} **Rep** (**#${blabla}**)`,
            });
          }
        }
      });
    } else if (interaction.commandName === "giverep") {
      if (
        (interaction.channelID === "722753194496753745") |
        (interaction.channelID === "752110992405692456")
      )
        return;
      await mongo().then(async (mongoose) => {
        let logChannel =
          interaction.guild.channels.cache.get("864669032811331584");
        const { user } = interaction.options.get("user");
        if (user.id === interaction.member.id)
          return interaction.reply({
            content: `You can give reputation to yourself haiz...., but nice try <:weirdchamp:839890533244862474>`,
          });
        let isPersonHasRep = await rep.findOne({ id: user.id });
        let personID = user.id;
        if (isPersonHasRep) {
          await isPersonHasRep.updateOne({
            rep: parseInt(isPersonHasRep.rep) + 1,
          });
        } else {
          await rep.create({
            name: nicknameMaker(interaction, personID),
            id: personID,
            rep: 1,
          });
        }
        let personData = await rep.findOne({ id: personID });
        let blabla =
          (await (
            await rep.find().sort({ rep: -1 })
          ).findIndex((i) => i.id === personID)) + 1;
        interaction.reply({
          content: `Gave \`1\` Rep to **${personData.name}** (current: \`#${blabla}\` -\`${personData.rep}\`)`,
        });
        recentlyRan.push(interaction.member.id);
        setTimeout(() => {
          recentlyRan = recentlyRan.filter(
            (string) => string !== interaction.member.id
          );
        }, 420000);
        logChannel.send({
          content: `**${nicknameMaker(
            interaction,
            interaction.member.id
          )}** has given \`1\` Rep to **${personData.name}** in <#${
            interaction.channelID
          }> at ${dateMaker(new Date())}`,
        });
      });
    }
  }
});
client.on("channelDelete", async (channel) => {
  const channelId = channel.id;
  await mongo().then(async (mongoose) => {
    await report.findOneAndDelete({ channelId: channelId });
  });
});
client.on("guildMemberRemove", (member) => {
  let logchannel = member.guild.channels.cache.get("703862691608920118");
  logchannel.send(
    `${member.user.tag} has left the server <:stare:861994964137541653>`
  );
});

client.on("ready", async () => {
  const statusArray = [
    "Gato #1",
    "Luai is rich but gay",
    "Ybibaboo my god",
    "current prefix is !",
  ];
  console.log("The Bot is Online");
  await database
    .connect(
      "mongodb+srv://damaradewa:damaradewa@cluster0.knsns.mongodb.net/database4?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      }
    )
    .then(() => {
      console.log("Connected to the database");
    });
  let index = 0;
  setInterval(() => {
    if (index === statusArray.length) index = 0;
    const status = statusArray[index];
    client.user.setActivity(status, { type: "WATCHING" });
    index++;
  }, 3000);
});
module.exports = {
  recentlyRan,
};
client.login(process.env.token);
