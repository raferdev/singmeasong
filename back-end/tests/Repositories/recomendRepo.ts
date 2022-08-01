import {prisma} from "../../src/database.js"
import { CreateRecommendationData } from "../../src/services/recommendationsService.js";

async function clean() {
    return await prisma.recommendation.deleteMany();
}

async function add(video:CreateRecommendationData) {
    return await prisma.recommendation.create({data:video})
}

async function addMany(videoArr:CreateRecommendationData[]) {
    return await prisma.recommendation.createMany({data:videoArr})
}
async function updateAllScore(score:number) {
    return await prisma.recommendation.updateMany({data:{score}})
}

const Recomendations = {
    clean,
    add,
    addMany,
    updateAllScore
}

export default Recomendations;