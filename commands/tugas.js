const { Message, Client, MessageEmbed, MessageButton } = require("discord.js");
const task = require("../models/tugas");
module.exports = {
  name: "tugas",
  aliases: ["tugasku", "deadline", "task"],
  description: "list tugas saya",
  /**
   *
   * @param {Message} message
   * @param {*} args
   * @param {Client} client
   */
  async execute(message, args, client) {
    let firstArgument = args[0];
    if (firstArgument === "list") {
      let data = await task.find();
      let listMapel = data.map((e) => e.mapel).join("\n");
      let listDeskripso = data.map((e) => e.description).join("\n");
      let deadline = data.map((e) => e.deadline).join("\n");
      const embed = new MessageEmbed()
        .setColor("RED")
        .setAuthor("Daftar Tugas!", message.author.displayAvatarURL())
        .setDescription("Memperlihatkan daftar tugas untuk gato!")
        .addFields([
          { name: "**Mapel**", value: listMapel, inline: true },
          { name: "**Deskripsi**", value: listDeskripso, inline: true },
          { name: "**Deadline**", value: deadline, inline: true },
        ]);
      message.channel.send({
        embeds: [embed],
      });
    } else if (firstArgument === "add") {
      let mapel = args[1];
      let deadline = args[2];
      let description = args.slice(2).join(" ");
      await task.create({
        mapel,
        deadline,
        description,
      });
      message.reply("Task created!");
    }
  },
};
