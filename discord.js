// media.discordapp.net
// Bypass: Access-Control-Allow-Origin

(async () => {

  const main = document.querySelector("#main")

  // request function:
  async function request(url) {
    await fetch(url).then(res => {
      if (res.ok) {
        main.innerHTML += `<div class="box"><a target="_blank" href="${url}">${url}</a><span style="color:#0f0;">Request Success: ${res.headers.get("content-type")}</span></div>`
      } else {
        response_fail()
      }
    }).catch(err => {
      console.error(err)
      main.innerHTML += `<div class="box"><a target="_blank" href="${url}">${url}</a><span style="color:#faa;">Request Failed: Check the console for the error.</span></div>`
    })
  }

  // -----------------------------

  // test image request:
  await request("https://cdn.discordapp.com/attachments/1091726049898922024/1122173084259061960/discord.png")

  // test binary file request:
  await request("https://cdn.discordapp.com/attachments/1091726049898922024/1122164748650299402/binary.bin")

  main.innerHTML += `<hr><span style="font-weight:bold;">I found the perfect way to download large binaries or upload large videos. Access-Control-Allow-Origin is disabled here. (bypassed) I can store this as multiple files in media.discordapp. As an example, the video below (more than 8 MB) can download media.discordapp binaries as parts. Look at the javascript codes.</span><hr>`

  // example: long video or binary file download:

  const parts = [
    "https://media.discordapp.net/attachments/1091726049898922024/1122214459700691014/binary.webm",
    "https://media.discordapp.net/attachments/1091726049898922024/1122214513089970237/binary.webm",
    "https://media.discordapp.net/attachments/1091726049898922024/1122214567146172548/binary.webm",
    "https://media.discordapp.net/attachments/1091726049898922024/1122214592551071824/binary.webm"
  ]

  const ms = new MediaSource()
  const video = document.createElement("video")
  video.src = URL.createObjectURL(ms)
  video.controls = true
  main.appendChild(video)

  ms.addEventListener("sourceopen", async () => {

    const source = ms.addSourceBuffer('video/webm; codecs=vp8,opus')
    var index = 0

    source.addEventListener("updateend", async () => {
      index++
      if (parts[index]) {
        await ab()
      } else {
        ms.endOfStream()
      }
    })

    const ab = async () => {
      const res = await fetch(parts[index])
      source.appendBuffer((await res.arrayBuffer()).slice(1024 * 2))
    }
    await ab()

  })

})()