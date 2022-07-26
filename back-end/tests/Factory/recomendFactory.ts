import { faker } from "@faker-js/faker";

function video() {
    const video = {
        name:faker.music.songName,
        youtubeLink:"https://www.youtube.com/watch?v=ZhstyJSNKME&t=74s"
    }
    return video
};

const Recomends = {
    video
};

export default Recomends;