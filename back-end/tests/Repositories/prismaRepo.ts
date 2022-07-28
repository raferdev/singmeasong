import { prisma } from "../../src/database.js";

async function disconnect() {
  await prisma.$disconnect();
};

const Prisma = {
    disconnect
}

export default Prisma