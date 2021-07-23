module.exports = {
  name: "testing",
  description: "testing command for command handler",
  execute(message, args) {
    message.channel.send("Pong");
  },
};
