const { PrismaClient } = require('@prisma/client');

const prismaClientSingleton = () => {
    return new PrismaClient();
};

global.prismaGlobal = global.prismaGlobal || prismaClientSingleton();

/** 
 * @type {PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>}
 */
const prisma_common = global.prismaGlobal;

module.exports = prisma_common;

if (process.env.NODE_ENV !== 'production') global.prismaGlobal = prisma_common;
