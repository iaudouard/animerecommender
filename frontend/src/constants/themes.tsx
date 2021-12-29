import { GiTwirlyFlower, GiBullHorns, GiRayGun } from "react-icons/gi";
import { FaPoop } from "react-icons/fa";

export const darling = {
  Icon: function () {
    return <GiBullHorns color="#a30000" />;
  },
  bng: "#fec8cd",
  primary: "#ffaeb6",
  secondary: "#a30000",
  tercery: "#f68a95",
};

export const poop = {
  Icon: function () {
    return <FaPoop color="#7ebab5" />;
  },
  bng: "#442F29",
  primary: "#61433a",
  secondary: "#7ebab5",
  tercery: "#c25c42",
};

export const hana = {
  Icon: function () {
    return <GiTwirlyFlower color="#eaa09c" />;
  },
  bng: "#173F35",
  primary: "#408E7B",
  secondary: "#eaa09c",
  tercery: "#123129",
};

export const laser = {
  Icon: function () {
    return <GiRayGun color="#009eaf" />;
  },
  bng: "#221b44",
  primary: "#b82356",
  secondary: "#009eaf",
  tercery: "#751a3a",
};

export const themes = {
  poop: poop,
  hana: hana,
  darling: darling,
  laser: laser,
};
export const themeNames = ["poop", "hana", "darling", "laser"];
