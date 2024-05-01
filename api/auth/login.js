const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Crypto = require('crypto-js');
require('colors')

module.exports = async function (req, res) {
    if (!req.body) return res.json({
        success: false,
        message: "body is required"
    })

    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
        return res.json({
            success: false,
            message: "email and password are required"
        })
    }

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        return res.json({
            success: false,
            message: "user not found"
        })
    }

    if (user.password !== password) {
        return res.json({
            success: false,
            message: "password incorrect"
        })
    }

    const token = Crypto.AES.encrypt(JSON.stringify({
        id: user.id
    }), "makuro").toString()

    res.cookie("token", token)

    return res.json({
        success: true,
        token
    })
}