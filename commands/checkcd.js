const { Message, Client, MessageEmbed } = require("discord.js");
const { recentlyRan } = require("../list");
module.exports = {
  name: "checkcd",
  description:
    "checking cooldowns for reputation command before I restart the bot",
  aliases: ["cd", "cooldown"],
  /**
   *
   * @param {Message} message
   * @param {*} args
   * @param {Client} client
   */
  async execute(message, args, client) {
    let finalString;
    if (recentlyRan.length === 0) {
      finalString = "Clear!";
    } else {
      finalString = recentlyRan
        .map(
          (element) =>
            `<@${(await message.guild.members.fetch()).get(element)}>`
        )
        .join("\n");
    }
    const embed = new MessageEmbed()
      .setDescription(`**Cooldown List** \n\n${finalString}`)
      .setFooter("hahaha");
    message.channel.send({
      embeds: [embed],
    });
  },
};
