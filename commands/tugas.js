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
      try {
        let mapel = args[1];
        let tanggal = args[2];
        let description = args.slice(2).join(" ");
        const date = new Date(tanggal);
        const now = new Date();
        let deadline = date - now;
        await task.create({
          mapel,
          deadline: (deadline / 84600000).toFixed(0),
          description,
        });
        message.reply("Task created!").then((msg) => {
          setTimeout(() => {
            msg.delete();
            message.delete();
          }, 5000);
        });
      } catch (error) {
        message.reply("Something went wrong!");
      }
    }
  },
};
