const fs = require("fs")
const path = require("path")
const root_path = process.cwd()
const _ = require("lodash")

module.exports = async function (req, res) {
    let list_data = []
    let list = (await fs.promises.readdir(path.join(root_path, "../"))).filter(x => x !== ".DS_Store")

    for (let l of list) {
        try {
            const name = l
            const type = JSON.parse(await fs.promises.readFile(path.join(root_path, "../", l, "package.json"), "utf-8")).dependencies.express ? "express" : "nextjs"
            const prisma = (await fs.promises.readdir(path.join(root_path, "../", l, "prisma"), "utf-8")).length > 0
            const script = JSON.parse((await fs.promises.readFile(path.join(root_path, "../", l, "package.json"), "utf-8"))).scripts

            const data = {
                name,
                type,
                studio: prisma,
                script
            }

            list_data.push(data)
        } catch (error) {
            const data = {
                name: l,
                type: null,
                studio: null
            }

            list_data.push(data)
            // console.log(error)
        }

    }
    list_data = _.orderBy(list_data, ["type"], ["asc"])
    res.json(list_data)
}