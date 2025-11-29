const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

const TOKEN = process.env.TOKEN;
const WEBHOOK = process.env.WEBHOOK;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.on("ready", () => {
  console.log(`Bot is online as ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  try {
    await axios.post(WEBHOOK, {
      content: `👋 Welcome **${member.user.username}** to the server!`
    });
    console.log(`Welcomed: ${member.user.username}`);
  } catch (err) {
    console.error("Webhook Error:", err);
  }
});

client.login(TO
             KEN);
