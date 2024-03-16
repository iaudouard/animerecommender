package main

import (
  "log"
  "flag"
)

func main() {
  var input string
  flag.StringVar(&input, "anime", "", "input to get autocomplete for")
  flag.Parse()

  log.Printf("building autocomplete for: ", input, "...")

  if input == "" {
    log.Fatalf("please provide an input for arg 'anime'")
  }

  res := getAutocomplete(input)
  log.Printf("results: ", res)
}
