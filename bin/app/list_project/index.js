const fs = require("fs")
const path = require("path")
const root_path = process.cwd()

module.exports = async function (req, res) {
    let list = await fs.promises.readdir(path.join(root_path, "../"))

    list = list.map(async (x) => ({
        name: x,
        type: (await fs.promises.readFile(path.join(root_path, "../", x, "package.json"), { encoding: "utf8" }).then(x => JSON.parse(x).scripts.dev)) ? "nextjs" : "express",
    }))
    res.json(list.filter(x => x !== ".DS_Store"))
}