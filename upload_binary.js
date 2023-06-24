// media.discordapp.net
// Bypass: Access-Control-Allow-Origin

const { Client, channelLink, TextChannel, AttachmentBuilder } = require("discord.js")
const fs = require("fs")

const client = new Client({ intents: [] })

const bypass_header = fs.readFileSync("hadise.webm").slice(0, 1024 * 2)

console.log("BYPASS HEADER", bypass_header.length)

client.on("ready", async () => {
  console.log(client.user.tag, "bot ready")

  /** @type {TextChannel} */
  const channel = await client.channels.fetch("1091726049898922024")

  async function upload_binary(buff) {
    console.log("upload starting...")
    const send = await channel.send({ files: [new AttachmentBuilder(Buffer.concat([bypass_header, buff]), { name: "binary.webm" })] })
    console.log("upload success" , send.attachments.at(0).url)
  }

  const read_stream = fs.createReadStream("hadise.webm", { highWaterMark: 1024 * 1024 * 5 })
  const chunks = []

  read_stream.on("data", (chunk) => {
    chunks.push(chunk)
  })

  read_stream.on("close", async () => {
    console.log(chunks.length, "chunks start!")
    for (var i = 0; i < chunks.length; i++) {
      await upload_binary(chunks[i])
    }
  })

})

client.login("TOKEN LOGIN")
