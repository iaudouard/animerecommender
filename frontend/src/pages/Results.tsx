import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Results.css";
import fetchRecommendations from "../utils/api";
import { CoffeeLoading } from "react-loadingg";
import Card from "../components/Card";
import { ThemeContext } from "../App";

interface Props {}

export default function Results({}: Props) {
  const location = useLocation();
  const state = location.state;
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function fetcher() {
      const url = `https://ivanadrd.pythonanywhere.com/?anime_title=${state.animeTitle}&number_of_anime=${state.numberOfRecommendations}`;
      const data = await fetchRecommendations(url);
      setRecommendations(data["data"]);
      setIsLoading(false);
    }
    fetcher();
  }, []);

  return (
    <ThemeContext.Consumer>
      {(colorThemeContext) => {
        return (
          <div
            className="Results"
            style={{ backgroundColor: colorThemeContext["bng"] }}
          >
            {isLoading ? (
              <CoffeeLoading color={colorThemeContext["secondary"]} />
            ) : (
              <div className="resultsContainer">
                {recommendations.map((item: any, index: number) => {
                  return (
                    <Card
                      title={item["attributes"]["canonicalTitle"]}
                      poster={item["attributes"]["posterImage"]}
                      synopsis={item["attributes"]["synopsis"]}
                      color={colorThemeContext["primary"]}
                    />
                  );
                })}
              </div>
            )}
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
}
