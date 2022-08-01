import { faker } from "@faker-js/faker";
import axios from "axios";

function createVdeo() {
  const video = {
    name:faker.music.songName(),
    link:`https://www.youtube.com/watch?v=${faker.random.alpha(11)}`}
    return video
}

async function seed() {
  for(let i = 0; i<10;i++) {
    const video = Factory.Recommendations.createVdeo();
    await axios.post('http://localhost:5000/recommendations').body(video);

  }
}

const Recommendations = {
  createVdeo,
  seed
};

export default Recommendations;
