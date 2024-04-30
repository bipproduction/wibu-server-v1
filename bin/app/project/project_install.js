const { spawn } = require('child_process')
const path = require('path')
module.exports = async function (req, res) {
    const name = req.query.name
    if (!name) {
        const child = spawn('echo', ['name is required'])
        child.stdout.pipe(res)
        child.stderr.pipe(res)
    }

    if (name.includes("wibu-server")) {

        const child = spawn('yarn', ['install'], {
            cwd: path.join(process.cwd(), "./")
        })

        child.stdout.pipe(res)
        child.stderr.pipe(res)
    } else {
        console.log(name.green, "installing ...")

        const child = spawn('yarn', ['install'], {
            cwd: path.join(process.cwd(), "../", name)
        })


        child.stdout.pipe(res)
        child.stderr.pipe(res)
    }

}