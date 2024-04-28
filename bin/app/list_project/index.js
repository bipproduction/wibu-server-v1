const fs = require("fs")
const path = require("path")
const root_path = process.cwd()

module.exports = async function (req, res) {
    let list_data = []
    let list = (await fs.promises.readdir(path.join(root_path, "../"))).filter(x => x !== ".DS_Store")

    for (let l of list) {
        const name = l
        const type = JSON.parse(fs.readFileSync(path.join(root_path, "../", l, "package.json"), "utf-8")).dependencies.express

        const data = {
            name,
            type
        }

        list_data.push(data)

    }

    res.json(list_data)
}