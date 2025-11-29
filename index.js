const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages
  ]
});

// CONFIG
const WEBHOOK_URL = process.env.WEBHOOK;   // Webhook URL in Replit Secrets
const ROLE_ID = "DEINE_ROLE_ID";          // noob | lvl 1

client.on("ready", () => {
  console.log(`Bot logged in as ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  // 1) Auto-role
  try {
    const role = member.guild.roles.cache.get(ROLE_ID);
    if (role) await member.roles.add(role);
  } catch (err) {
    console.log("Role Error:", err);
  }

  // 2) DM
  try {
    await member.send("Check out our website: https://offenseware.top ❤️");
  } catch (err) {
    console.log("DM Error:", err);
  }

  // 3) Send welcome via WEBHOOK and ensure mention pings
  try {
    // payload: only one ping (<@id>) and explicitly allow that user to be mentioned
    await axios.post(WEBHOOK_URL, {
      content: `Welcome to OffenseWare. W <@${member.id}> ❤️‍🩹`,
      allowed_mentions: {
        users: [member.id]         // <-- zwingt Discord, genau diesen User zu ping'n
      }
    });
  } catch (err) {
    console.log("Webhook Error:", err?.response?.data || err.message || err);
  }
});

client.login(process.env.TOKEN);
