const { Message } = require("discord.js");
const rep = require("../models/reputation");
module.exports = {
  name: "rename",
  description: "Blacklists people from joining Singapore Guild",
  /**
   * @param {Message} message
   */
  async execute(message, args) {
    const blabla = await rep.findOne({ name: "ChengPoh" });
    console.log(blabla.rep);
    message.channel.send(`${blabla.rep}`);
  },
};
