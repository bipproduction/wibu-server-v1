const fs = require("fs")
const _ = require("lodash")

module.exports = async function (req, res) {
    try {
        let list = await fs.promises.readdir("/etc/nginx/sites-enabled")
        // list = list.filter(x => x !== "default").map(async (x) => ({
        //     name: x.split("_")[0],
        //     port: Number(x.split("_")[1].split(".")[0]),
        //     host: await fs.promises.readFile(`/etc/nginx/sites-enabled/${x}`, "utf-8")
        // }))

        for (let l of list) {
            l.name = l.split("_")[0]
            l.port = Number(l.split("_")[1])
            try {
                l.host = await fs.promises.readFile(`/etc/nginx/sites-enabled/${l}`, "utf-8")
            } catch (error) {
                console.log(error)
            }
        }

        list = _.orderBy(list, ["port"], ["asc"])
        return res.json(list)
    } catch (error) {
        return res.json([])
    }
}