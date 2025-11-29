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
const WEBHOOK_URL = process.env.WEBHOOK; // Webhook URL in Secrets
const ROLE_ID = "1429084247213215937";         // noob | lvl 1

client.on("ready", () => {
    console.log(`Bot logged in as ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {

    // 1️⃣ AUTO-ROLE
    try {
        const role = member.guild.roles.cache.get(ROLE_ID);
        if (role) await member.roles.add(role);
    } catch (err) {
        console.log("Role Error:", err);
    }

    // 2️⃣ SEND DM
    try {
        await member.send("Check out our website: https://offenseware.top ❤️");
    } catch (err) {
        console.log("DM Error:", err);
    }

    // 3️⃣ WEBHOOK WELCOME MESSAGE
    try {
        await axios.post(WEBHOOK_URL, {
            content: `Welcome to OffenseWare. W <@${member.id}> ❤️‍🩹`
        });
    } catch (err) {
        console.log("Webhook Error:", err);
    }
});

client.login(process.env
             .TOKEN);
