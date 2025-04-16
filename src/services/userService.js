import pkg from '@prisma/client';
const { PrismaClient } = pkg;


const prisma = new PrismaClient()


const getUsers = async (data) => {
    const users = await prisma.user.findMany()

    console.log(users)
};
export default  {
    getUsers,
};
