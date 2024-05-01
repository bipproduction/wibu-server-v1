const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
    const header = req.headers

    res.json({ token: header })

}