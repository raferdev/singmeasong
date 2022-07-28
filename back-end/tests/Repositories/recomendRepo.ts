import {prisma} from "../../src/database.js"

async function clean() {
    return await prisma.recommendation.deleteMany();
}

const Recomendations = {
    clean
}

export default Recomendations;