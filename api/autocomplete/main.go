package main

import (
  "log"
)

func main() {
  res := getAutocomplete("shingeki no kyojin")
  log.Printf("results: ", res)
  res = getAutocomplete("naruto")
  log.Printf("results: ", res)
}
