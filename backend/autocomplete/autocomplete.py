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
        display_results = []
        for result in results:
            display_result = self.autocomplete.words[result[0]].display
            if display_result not in display_results:
                display_results.append(display_result)
        return display_results
