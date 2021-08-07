const {
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  CommandInteraction,
  Client,
} = require("discord.js");
const { faq, errorSelectMenus } = require("../../list");
module.exports = {
  name: "docs",
  description: "Showing docs of the guilds",
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    let question = interaction.options.getString("query");
    let target = interaction.options.getUser("target");
    let answer = Object.keys(faq).find((m) =>
      m.toLowerCase().includes(question.toLowerCase())
    );
    switch (answer) {
      case "whatIsZvz":
        title = "What is ZvZ?";
        break;
      case "whatIsCaravan":
        title = "What is Caravan?";
        break;
      case "howToJoinCaravan":
        title = "How do I join Caravan?";
        break;
      case "caravanGears":
        title = "What gear should I wear in Caravan?";
        break;
      case "howToGetIntoR3OrWwp":
        title = "How do I get into R3 or WWP?";
        break;
      case "whichIsBetterR3OrWwp":
        title = "Which one is better? R3 or WWP?";
        break;
      case "howToGetIntoR3OrWwp":
        title = "How do I get into R3 or WWP?";
        break;
      default:
        break;
    }
    if (answer !== undefined) {
      interaction.reply({
        content: `_Showing answer for <@${
          target ? target.id : interaction.user.id
        }>_ \n<:singaporeDiscordEmoji:873354185645625414> __**${title}**__ \n${
          faq[answer]
        }`,
      });
    } else {
      interaction
        .reply({
          ephemeral: true,
          content: `<:singaporeDiscordEmoji:873354185645625414> No match, please search through the docs below`,
          components: [errorSelectMenus],
        })
        .then((msg) => {
          const filter = (interaction) => interaction.customId === "docs";
          interaction.channel
            .awaitMessageComponent({ filter, time: 60000 })
            .then((reaction) => {
              reaction
                .update({
                  ephemeral: true,
                  content: "Suggestion sent!",
                  components: [],
                })
                .then(() => {
                  Object.keys(faq).forEach((val, index) => {
                    if (reaction.values.includes(val)) {
                      switch (val) {
                        case "whatIsZvz":
                          title = "What is ZvZ?";
                          break;
                        case "whatIsCaravan":
                          title = "What is Caravan?";
                          break;
                        case "howToJoinCaravan":
                          title = "How do I join Caravan?";
                          break;
                        case "caravanGears":
                          title = "What gear should I wear in Caravan?";
                          break;
                        case "howToGetIntoR3OrWwp":
                          title = "How do I get into R3 or WWP?";
                          break;
                        case "whichIsBetterR3OrWwp":
                          title = "Which one is better? R3 or WWP?";
                          break;
                        case "howToGetIntoR3OrWwp":
                          title = "How do I get into R3 or WWP?";
                          break;
                        case "commonlyUsedAcronyms":
                          title = "Commony Used Acronyms (and terms):";
                          break;
                        case "whatIsAvalonianRaidDungeon":
                          title = "What is Avalonian Dungeon?";
                          break;
                        case "approvedScout":
                          title = "Approved Scout";
                          break;
                        default:
                          break;
                      }
                      if (val === "approvedScout") {
                        reaction.followUp({
                          content: `_Showing answer for <@${reaction.user.id}>_ \n<:singaporeDiscordEmoji:873354185645625414> __**${title}**__`,
                          embeds: [faq.approvedScout(MessageEmbed, client)],
                        });
                      } else {
                        reaction.followUp({
                          content: `_Showing answer for <@${
                            reaction.user.id
                          }>_ \n<:singaporeDiscordEmoji:873354185645625414> __**${title}**__ \n${
                            faq[reaction.values]
                          }`,
                        });
                      }
                    }
                  });
                });
            });
        });
    }
  },
};
