import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { themes } from "../constants/themes";
import "../styles/Results.css";
import fetchRecommendations from "../logic/api";
import { CoffeeLoading } from "react-loadingg";
import Card from "../components/Card";

interface Props {}

export default function Results({}: Props) {
  const location = useLocation();
  const state = location.state;

  const [themeIndex, setThemeIndex] = useState(state.themeIndex);
  const [colorTheme, setColorTheme] = useState(themes[themeIndex]);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  useEffect(() => {
    async function fetcher() {
      const data = await fetchRecommendations(
        state.animeTitle,
        state.numberOfRecommendations
      );
      setRecommendations(data["data"]);
      setIsLoading(false);
    }
    fetcher();
  }, []);

  return (
    <div className="Results" style={{ backgroundColor: colorTheme["primary"] }}>
      {isLoading ? (
        <CoffeeLoading color={colorTheme["secondary"]} />
      ) : (
        recommendations.map((item: any, index: number) => {
          return (
            <Card
              title={item["attributes"]["canonicalTitle"]}
              secondary={colorTheme["secondary"]}
            />
          );
        })
      )}
    </div>
  );
}
