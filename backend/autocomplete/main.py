from autocomplete import AnimeAutocomplete
from goblet import Goblet, goblet_entrypoint, jsonify

app = Goblet(function_name="autocomplete")
goblet_entrypoint(app)


autocomplete = AnimeAutocomplete(filepath="data/anime_titles.json")


@app.route("/autocomplete/{query}", methods=["GET"])
def get_autocomplete(query: str):
    results = autocomplete.search(query)
    return jsonify(results=results)
