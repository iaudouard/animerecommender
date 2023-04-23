from flask import Flask, jsonify, request

from autocomplete import AnimeAutocomplete

app = Flask(__name__)


autocomplete = AnimeAutocomplete(filepath="data/anime_titles.json")


@app.route("/autocomplete", methods=["GET"])
def get_autocomplete():
    query = request.args.get("query")
    results = autocomplete.search(query)
    return jsonify(results)


if __name__ == "__main__":
    app.run()
