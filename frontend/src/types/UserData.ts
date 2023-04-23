import Anime from "./Anime";

export default interface UserData {
  username: string;
  likedAnime: Array<Anime>;
  theme: string;
  email: string;
}
