# AnimeRecommender Autocomplete

Autocomplete for AnimeRecommender built with [seperman's fast-autocomplete](https://github.com/seperman/fast-autocomplete)

### How to run

- Build the Docker image:
  `docker build --tag [your-tag-name] .`

- Run the image:
  `docker run -d -p 8080:5000 [your-tag-name]`

### Endpoints

- GET '/autocomplete?query='
  - returns list of 5 autocomplete values
