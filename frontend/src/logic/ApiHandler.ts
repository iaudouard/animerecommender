function parseAnimeTitleForApi(animeTitle: string) {
  return animeTitle.replaceAll(" ", "-");
}
export default function fetchRecommendations(
  animeTitle: string,
  numberOfRecommendations: number
) {
  const baseUrl: string = "https://ivanadrd.pythonanywhere.com/api/";
  fetch(
    baseUrl + parseAnimeTitleForApi(animeTitle) + "+" + numberOfRecommendations
  )
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(json.data);
    });
}
