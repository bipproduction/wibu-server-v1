const { spawn } = require('child_process')
const path = require('path')
require('colors')
module.exports = async function (req, res) {
    /**
       * @type {string}
       */
    const name = req.query.name

    if (!name) {
        return res.json({
            success: false,
            message: "name is required"
        })
    }

    if (name.includes("wibu-server")) {
        const child = spawn('yarn', ['build'], {
            cwd: path.join(process.cwd(), "./")
        })

        child.stdout.pipe(res)
        child.stderr.pipe(res)
    } else {
        console.log(name.green)
        const child = spawn('yarn', ['build'], {
            cwd: path.join(process.cwd(), "../", name)
        })

        child.stdout.pipe(res)
        child.stderr.pipe(res)

    }
}