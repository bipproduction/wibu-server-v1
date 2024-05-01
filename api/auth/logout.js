module.exports = async function (req, res) {
    res.clearCookie('token')
    res.json({ success: true })
}