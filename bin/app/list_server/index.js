const fs = require("fs")
const _ = require("lodash")

module.exports = async function (req, res) {
    let list_data = []
    try {
        let list = await fs.promises.readdir("/etc/nginx/sites-enabled")
        // list = list.filter(x => x !== "default").map(async (x) => ({
        //     name: x.split("_")[0],
        //     port: Number(x.split("_")[1].split(".")[0]),
        //     host: await fs.promises.readFile(`/etc/nginx/sites-enabled/${x}`, "utf-8")
        // }))

        for (let l of list) {
            const data = {}
            data.id = l
            data.name = l.split("_")[0]
            data.port = Number(l.split("_")[1])
            try {

                const host = await fs.promises.readFile(`/etc/nginx/sites-enabled/${l}`, "utf-8")
                const regex = /server_name\s+([^;]+);/g;
                const matches = [...host.matchAll(regex)];
                const serverNames = matches.map(match => match[1].trim())[0];
                data.server_name = serverNames
            } catch (error) {
                console.log(error)
            }

            list_data.push(data)
        }

        list = _.orderBy(list_data, ["port"], ["asc"])
        return res.json(list_data)
    } catch (error) {
        return res.json([])
    }
}