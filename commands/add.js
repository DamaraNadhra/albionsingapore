module.exports = {
  name: "add",
  description: "Add a person personally into the case",
  async execute(message, args) {
    if (
      message.member.roles.cache.has("759793776439984170") |
      message.member.roles.cache.has("855688610782248980") |
      message.member.roles.cache.has("855689169018814464")
    ) {
      let personMention = message.mentions.members.first();
      let channelMention = message.mentions.channels.first();
      message.delete().then(() => {
        if (!personMention)
          return message.reply(`Please state the person's mention`);
        if (!channelMention)
          return message.reply(`Please state the channel's mention`);
        if (
          (channelMention.parentID === "853522303811321876") |
          (channelMention.parentID === "853522605684686878")
        ) {
          channelMention.updateOverwrite(personMention.user, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
          });
          message.reply({
            content: `${personMention} has been added to ${channelMention}`,
          });
        } else {
          return message.reply({
            content:
              "This command only works for ticket channels, thank you, <:jennielove:844893922634235904>",
          });
        }
      });
    } else {
      return message.reply({
        content: "You don't have permission to use this command",
      });
    }
  },
};