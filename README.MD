<p align="center">
    <img width=60% src="https://user-images.githubusercontent.com/90880784/212175097-35cfdec0-446c-4180-9f78-23b8147968bb.png">
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
