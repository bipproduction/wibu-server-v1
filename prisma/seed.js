const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const list_user_role = [
    {
        id: "admin",
        name: "admin",
    },
    {
        id: "wibu",
        name: "wibu",
    }
]

const list_user = [
    {
        id: "admin",
        name: "admin",
        email: "admin@wibudev.com",
        password: "wibuadmin",
        userRoleId: "admin",
    },
    {
        id: "wibu",
        name: "wibu",
        email: "wibu@wibudev.com",
        password: "wibu",
        userRoleId: "wibu",
    }
];

; (async () => {


    // create user role
    for (let ur of list_user_role) {
        await prisma.userRole.upsert({
            where: {
                id: ur.id
            },
            update: ur,
            create: ur
        })
    }
    console.log("user role created")

    // create user
    for (let u of list_user) {
        await prisma.user.upsert({
            where: {
                id: u.id
            },
            update: u,
            create: u
        })
    }
    console.log("user created")



})().then(async () => {

    console.log("done")
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})

