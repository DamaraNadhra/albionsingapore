const { Message } = require("discord.js");
const rep = require("./models/reputation");
module.exports = {
  name: "blacklist",
  description: "Blacklists people from joining Singapore Guild",
  /**
   * @param {Message} message
   */
  execute(message, args) {
    const blabla = await rep.findOne({ name: "ChengPoh" });
    message.channel.send(blabla.rep);
  },
};
