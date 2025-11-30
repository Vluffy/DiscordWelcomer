import { Client, GatewayIntentBits } from "discord.js";
import axios from "axios";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

const WEBHOOK_URL = process.env.WEBHOOK;
const ROLE_ID    = process.env.ROLE_ID;

client.on("ready", () => console.log(`Bot logged in as ${client.user.tag}`));

client.on("guildMemberAdd", async member => {
  try {
    const role = member.guild.roles.cache.get(ROLE_ID);
    if (role) await member.roles.add(role);
  } catch {}

  try {
    await member.send("Check out our website: https://offenseware.top ❤️");
  } catch {}

  try {
    await axios.post(WEBHOOK_URL, {
      content: `Welcome to OffenseWare. W <@${member.id}> ❤️‍🩹`,
      allowed_mentions: { users: [member.id] }
    });
  } catch (e) {
    console.error("Webhook error:", e);
  }
});

client.login(process.env.TOKEN);
