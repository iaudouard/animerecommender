<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][https://github.com/fusunnn/animerecommender/graphs/contributors]
[![Stargazers][stars-shield]][https://github.com/fusunnn/animerecommender/stargazers]
[![Issues][issues-shield]][https://github.com/fusunnn/animerecommender/issues]
[![MIT License][license-shield]][https://github.com/fusunnn/animerecommender/blob/main/license]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src=".public/favicon.ico" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Anime Recommender</h3>

  <p align="center">
    This project is a fullstack anime recommendation system, with a backend/api that currently uses our own system to recommend anime based on a single anime given as input. *soon to be implemented with matrix factorization as we have added an account feature on the frontend*
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
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email`, `email_client`, `project_title`, `project_description`

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [React.js](https://reactjs.org/)
- [Flask](https://flask.palletsprojects.com/en/2.0.x/)

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

2. Clone the repo
   ```sh
   git clone https://github.com/fusunnn/animerecommender
   ```
3. Install NPM packages
   ```sh
   yarn install
   ```
4. Enter your Firebase project data in `.env`
   ```env
   REACT_APP_API_KEY=
   REACT_APP_AUTH_DOMAIN=
   REACT_APP_PROJECT_ID=
   REACT_APP_STORAGE_BUCKET=
   REACT_APP_MESSAGING_SENDER_ID=
   REACT_APP_APP_ID=
   REACT_APP_MEASUREMENT_ID=
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- Basic recommendation - Enter one anime and get as many as you asked for back
- Account system - Every time you ask for a recommendation, the anime you inputed for reference will be saved as a liked anime
- Themeing System - Make use of our set of 4 themes that are saved to both your browser and your account if you have one. _all themes were pulled from _ [Monkeytype](https://github.com/Miodec/monkeytype)

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

fusunnn - [@twitter_handle](https://twitter.com/audouard_ivan) - i.audouard22@ejm.org

erni12345 -

Project Link: [https://github.com/fusunnn/animerecommender](https://github.com/fusunnn/animerecommender)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
