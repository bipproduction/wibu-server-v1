const { spawn } = require('child_process')
const path = require('path')

module.exports = async function (req, res) {
    const name = req.query.name
    if (!name) {
        return res.json({
            success: false,
            message: "name is required"
        })
    }

    // get current branch
    const git_branch = await new Promise((resolve, reject) => {
        let text = ""
        spawn('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
            cwd: path.join(process.cwd(), "../", name)
        }).stdout.on('data', (data) => {
            text += data
        }).on('close', () => {
            resolve(text.trim().replace(/\s/g, ""))
        })
    })

    console.log(git_branch)

    if (!git_branch) {
        return res.json({
            success: false,
            message: "git branch not found"
        })
    }

    if (name.includes("wibu-server")) {
        const child = spawn('git', ['pull', 'origin', git_branch], {
            cwd: path.join(process.cwd())
        })
        child.stdout.pipe(res)
        child.stderr.pipe(res)
    } else {
        const child = spawn('git', ['pull', 'origin', git_branch], {
            cwd: path.join(process.cwd(), "../", name)
        })

        child.stdout.on('data', (data) => {

            console.log(data.toString())
        })

        child.stderr.pipe(res)
        child.stdout.pipe(res)
    }

}

