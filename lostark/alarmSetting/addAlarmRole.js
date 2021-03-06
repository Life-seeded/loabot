const { MessageEmbed } = require("discord.js");
const fs = require("fs");

const addEmoji = `β°`;
const removeEmoji = `π`;

const addRoleEmbed = async (message, client) => {
  let data = JSON.parse(fs.readFileSync("alarmData.json"));

  let roleArr = [];
  for (let i = 0; i < data.length; i++) {
    roleArr[i] = data[i]["role"];
  }

  const embedMessage = new MessageEmbed()
    .setColor("#ff3399")
    .setTitle(`λ°μΌλ¦¬ λ‘μ μλ¦Ό`)
    .setDescription(
      `λ°μΌλ¦¬ μλμ λ°κ³  μΆλ€λ©΄ μλμκ³(${addEmoji}) μ΄λͺ¨ν°μ½μ ν΄λ¦­νμΈμ.
      μ΄μ μ μλ μ μ²­μ νλλ° μ΄μ λ μλμ λ°κ³ μΆμ§ μλ€λ©΄ λ¬΄μλͺ¨λ${removeEmoji} μ΄λͺ¨ν°μ½μ ν΄λ¦­νμΈμ.
      μ΄ μ€μ  λ©μμ§λ \`!μλμ­ν \` λͺλ Ήμ΄λ₯Ό ν΅ν΄ μΈμ λ μ§ λΆλ¬λΌ μ μμ΅λλ€.`
    );

  let sendedEmbed = message.channel.send({ embeds: [embedMessage] });

  (await sendedEmbed).react(addEmoji);
  (await sendedEmbed).react(removeEmoji);

  client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    // console.log(JSON.stringify(reaction));

    try {
      if (reaction.emoji.name === addEmoji) {
        reaction.message.guild.members.cache.get(user.id).roles.add(roleArr);
      }
    } catch (error) {
      console.log(error);
    }

    try {
      if (reaction.emoji.name === removeEmoji) {
        reaction.message.guild.members.cache.get(user.id).roles.remove(roleArr);
      }
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = { addRoleEmbed };
