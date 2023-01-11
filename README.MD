<p align="center">
    <img width=60% src="https://user-images.githubusercontent.com/90880784/211739649-071189c9-ef81-4a92-9bfc-de65d5478b3c.png">
</p>

```js
const { Client, DiscordIntents } = require("Magma.js");

const client = new Client({
    intents: [DiscordIntents.Guilds, DiscordIntents.GuildMessages, DiscordIntents.MessageContent],
});

//If you do not listen to this event, any errors may kill your process
client.on("error", (error) => {
    console.error(error);
})

client.on("ready", () => {
    console.log("Ready!");
});

client.on("messageCreate", (message) => {
    const content = message.content;
    const args = content.split("!")[1].split(" ");
    const command = args.shift()
    
    if (command === "ping") {
        message.reply("Pong!");
    }
});

client.connect({
    token: "Your bot token"
});
```
