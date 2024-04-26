const fs = require("fs")
const path = require("path")
const root_path = process.cwd()

module.exports = async function (req, res) {
    const list = await fs.promises.readdir(path.join(root_path, "../"))
    res.json(list.filter(x => x !== ".DS_Store"))
}