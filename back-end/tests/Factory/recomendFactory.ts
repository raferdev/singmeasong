import { faker } from "@faker-js/faker";

function video() {
    const video = {
        name:faker.music.songName(),
        youtubeLink:`https://www.youtube.com/watch?v=${faker.random.alpha(11)}`
    }
    return video
};

const Recomends = {
    video
};

export default Recomends;