const fs = require("fs")
const path = require("path")
const root_path = process.cwd()

module.exports = async function (req, res) {
    let list_data = []
    let list = (await fs.promises.readdir(path.join(root_path, "../"))).filter(x => x !== ".DS_Store")

    for (let l of list) {
        try {
            const name = l
            const type = JSON.parse(await fs.promises.readFile(path.join(root_path, "../", l, "package.json"), "utf-8")).dependencies.express ? "express" : "nextjs"
            console.log(name, type)
            const data = {
                name,
                type
            }

            list_data.push(data)
        } catch (error) {
            console.log(error)
        }

    }

    res.json(list_data)
}