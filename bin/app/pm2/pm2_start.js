const { spawn } = require('child_process')
const path = require('path')

module.exports = async function (req, res) {

    /**
     * @type {string}
     */
    const cmd = req.query.cmd
    const name = req.query.name
    if (!cmd || !name) {
        const child = spawn('echo', ['cmd is required and name is required'])
        child.stdout.pipe(res)
        return child.stderr.pipe(res)
    }

    console.log(name)
    if (name.includes("wibu-server")) {
        const child = spawn('/bin/bash', ['-c', cmd], {
            cwd: path.join(process.cwd(), "./")
        })

        child.stdout.pipe(res)
        return child.stderr.pipe(res)
    } else {
        console.log(name, "bawah")
        const child = spawn('/bin/bash', ['-c', cmd], {
            cwd: path.join(process.cwd(), "../", name)
        })

        child.stdout.pipe(res)
        return child.stderr.pipe(res)

    }

}