<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="./public/logo.png" alt="Logo" width="160" height="120">
  </a>

<h3 align="center">Anime Recommender</h3>

  <p align="center">
    This project is a fullstack anime recommendation system, with a backend/api that currently uses our own system to recommend anime based on a single anime given as input.
    <br />
    <br />
    <br />
    <a href="https://animerecommender.net">View Live</a>
    ·
    <a href="https://github.com/fusunnn/animerecommender/issues">Report Bug</a>
    ·
    <a href="https://github.com/fusunnn/animerecommender/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![Home](/public/homescreen.png)

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [React.js](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Flask](https://flask.palletsprojects.com/en/2.0.x/)
- [Firebase](https://firebase.google.com/)
- [RapidAPI](https://rapidapi.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Setup a Firebase project at [https://firebase.google.com/](https://firebase.google.com/)

2. Head to our [API](https://rapidapi.com/uruguay-nomas-uruguay-nomas-default/api/anime-recommender/) to get an api key

3. Clone the repo
   ```sh
   git clone https://github.com/fusunnn/animerecommender
   ```
4. Install the packages
   ```sh
   yarn install
   ```
5. Enter your Firebase project data in `.env` - a boilerplate for this is available in the `.env.example` --> to use it modify the file's name to `.env` and add in your own keys

   ```env
   REACT_APP_API_KEY=
   REACT_APP_AUTH_DOMAIN=
   REACT_APP_PROJECT_ID=
   REACT_APP_STORAGE_BUCKET=
   REACT_APP_MESSAGING_SENDER_ID=
   REACT_APP_APP_ID=
   REACT_APP_MEASUREMENT_ID=

   REACT_APP_RAPID_API_KEY=
   ```

6. Run the project
   ```
   yarn run start
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- Recommender API - go to our API @ [RapidAPI](https://rapidapi.com/uruguay-nomas-uruguay-nomas-default/api/anime-recommender)
- Website - Head to our website [AnimeRecommender](https://animerecommender.net/) to check out the website live,
- Account system - Every time you ask for a recommendation, the anime you inputed for reference will be saved as a liked anime
- Themeing System - Make use of our set of 4 themes that are saved to both your browser and your account (if you have one) - all themes were pulled from [Monkeytype](https://github.com/Miodec/monkeytype)

See the [open issues](https://github.com/fusunnn/animerecommender/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

fusunnn - [@audouard_ivan](https://twitter.com/audouard_ivan) - i.audouard22@ejm.org

erni12345 - [LinkedIn](https://www.linkedin.com/in/ernesto-de-menibus-0b8783219?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bt3Uv68e4RU%2BcSWmCVnEXgw%3D%3D) - ernestodemenibus@gmail.com

Project Link: [https://github.com/fusunnn/animerecommender](https://github.com/fusunnn/animerecommender)

<p align="right">(<a href="#top">back to top</a>)</p>
