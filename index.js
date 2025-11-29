const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const axios = require("axios");

const TOKEN = process.env.TOKEN;
const WEBHOOK = process.env.WEBHOOK;

// NAME OF THE AUTO ROLE
const AUTO_ROLE_NAME = "noob | lvl 1";

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
    //
    // 1️⃣  AUTO ROLE
    //
    const role = member.guild.roles.cache.find(r => r.name === AUTO_ROLE_NAME);
    if (role) {
      await member.roles.add(role);
      console.log(`Added role "${AUTO_ROLE_NAME}" to ${member.user.tag}`);
    } else {
      console.log(`Role "${AUTO_ROLE_NAME}" not found!`);
    }

    //
    // 2️⃣  WELCOME EMBED
    //
    const avatarUrl = member.user.displayAvatarURL({ size: 1024, extension: "png" });

    const embed = {
      title: "🎉 Welcome to the server!",
      description: `Glad to have you here, <@${member.id}>!\n\nMake yourself at home.`,
      color: 0x5865F2, // Discord blurple
      thumbnail: {
        url: avatarUrl
      },
      fields: [
        {
          name: "New Member",
          value: `${member.user.username}`,
          inline: true
        },
        {
          name: "Assigned Role",
          value: `**${AUTO_ROLE_NAME}**`,
          inline: true
        }
      ],
      footer: {
        text: "User joined",
        icon_url: avatarUrl
      },
      timestamp: new Date()
    };

    // Webhook send
    await axios.post(WEBHOOK, {
      content: `<@${member.id}> just joined! 👋`,
      embeds: [embed]
    });

    console.log(`Welcomed: ${member.user.username}`);

  } catch (err) {
    console.error("Error:", err);
  }
});

client.lo
  gin(TOKEN);
