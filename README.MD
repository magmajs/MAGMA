<p align="center">
    <img width=60% src="https://user-images.githubusercontent.com/90880784/212175736-eed3f8f9-7740-4033-ae83-df2aaab1312e.png">
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
