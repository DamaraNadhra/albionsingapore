const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
  name: "listbutton",
  description: "Listbutton whenever someone typed the !ava-[builds]",
  execute(interaction, client) {
    const closeButton = new MessageButton()
      .setCustomId("closebutton")
      .setEmoji("❌")
      .setLabel("Close")
      .setStyle("DANGER");
    const homeButton = new MessageButton()
      .setCustomId("home")
      .setEmoji("🏘️")
      .setLabel("Home")
      .setStyle("PRIMARY");
    interaction.update({
      components: [AvArow, new MessageActionRow().addComponents(closeButton)],
    });
  },
};
