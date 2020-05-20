const Discord = require('discord.js');
const client = new Discord.Client();
const _ = require('lodash');
const perks = require('./perks.json');
const misc = require('./misc.js');
const config = require('./resources/config.json');

const survivorPerks = config.survPerks;
const prefix = config.prefix;

const killerArray = perks.slice(survivorPerks);
const suvArray = perks.splice(0, survivorPerks);
function shuffle(array) {
  var i = array.length,
      j = 0,
      temp;
  while (i--) {
      j = Math.floor(Math.random() * (i+1));
      // swap randomly chosen element with current element
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on('message', message => {
  if (message.content.split('').length === 1);
  try{  
      let args = message.content.slice(prefix).trim().split(/ +/g);
      const command = args.shift().toLowerCase().replace(/[\W_]+/g, '');
        if (message.author.bot) return;
        if(message.content.indexOf(prefix) == 0){
          if(command === "killer"){
            let killPerks = misc.shuffle(killerArray);
            let perksEmbed1 = new Discord.MessageEmbed()
              .setColor(0x3a8d31)
              .setTitle(`${killPerks[0].name}`)
              .setDescription(`${killPerks[0].des}`)
              .setImage(`${killPerks[0].imgSrc}`);
            let perksEmbed2 = new Discord.MessageEmbed()
              .setColor(0x3a8d31)
              .setTitle(`${killPerks[1].name}`)
              .setDescription(`${killPerks[1].des}`)
              .setImage(`${killPerks[1].imgSrc}`);
            let perksEmbed3 = new Discord.MessageEmbed()
              .setColor(0x3a8d31)
              .setTitle(`${killPerks[2].name}`)
              .setDescription(`${killPerks[2].des}`)
              .setImage(`${killPerks[2].imgSrc}`);
            let perksEmbed4 = new Discord.MessageEmbed()
              .setColor(0x3a8d31)
              .setTitle(`${killPerks[3].name}`)
              .setDescription(`${killPerks[3].des}`)
              .setImage(`${killPerks[3].imgSrc}`);
            message.channel.send(perksEmbed1);
            message.channel.send(perksEmbed2);
            message.channel.send(perksEmbed3);
            message.channel.send(perksEmbed4);
          }
          else if(command === "survivor"){
            let survPerks = misc.shuffle(suvArray);
            let perksEmbed1 = new Discord.MessageEmbed()
              .setColor(0x3a8d31)
              .setTitle(`${survPerks[0].name}`)
              .setDescription(`${survPerks[0].des}`)
              .setImage(`${survPerks[0].imgSrc}`);
            let perksEmbed2 = new Discord.MessageEmbed()
              .setColor(0x3a8d31)
              .setTitle(`${survPerks[1].name}`)
              .setDescription(`${survPerks[1].des}`)
              .setImage(`${survPerks[1].imgSrc}`);
            let perksEmbed3 = new Discord.MessageEmbed()
              .setColor(0x3a8d31)
              .setTitle(`${survPerks[2].name}`)
              .setDescription(`${survPerks[2].des}`)
              .setImage(`${survPerks[2].imgSrc}`);
            let perksEmbed4 = new Discord.MessageEmbed()
              .setColor(0x3a8d31)
              .setTitle(`${survPerks[3].name}`)
              .setDescription(`${survPerks[3].des}`)
              .setImage(`${survPerks[3].imgSrc}`);
            message.channel.send(perksEmbed1);
            message.channel.send(perksEmbed2);
            message.channel.send(perksEmbed3);
            message.channel.send(perksEmbed4);
          }
        }
    }
  catch (err){
    console.log(err);
  }
});
client.login(config.token);
