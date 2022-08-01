import { faker } from "@faker-js/faker";

function createVdeo() {
  const video = {
    name:faker.music.songName(),
    link:`https://www.youtube.com/watch?v=${faker.random.alpha(11)}`}
    return video
}

const Recommendations = {
  createVdeo,
};

export default Recommendations;
