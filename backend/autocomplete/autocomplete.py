from fast_autocomplete import autocomplete_factory


class AnimeAutocomplete:
    def __init__(self, filepath: str):
        content_files = {
            "words": {
                "filepath": filepath,
                "compress": True,  # means compress the graph data in memory
            }
        }
        self.autocomplete = autocomplete_factory(content_files=content_files)

    def search(self, query: str) -> list[str]:
        results = self.autocomplete.search(query.lower())
        return [self.autocomplete.words[result[0]].display for result in results]
