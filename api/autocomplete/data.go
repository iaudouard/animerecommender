package main

import (
  "os"
  "log"
  "io/ioutil"
  "encoding/json"
)


func getTitles() []string {
  f, err := os.Open("data/titles.json")
  if err != nil {
    log.Fatalf("could not read all titles file")
  }

  b, err := ioutil.ReadAll(f)
  if err != nil {
    log.Fatalf("could not parse titles file as bytes")
  }

  var titles []string
  json.Unmarshal([]byte(b), &titles)
  
  return titles
}

func getSynonyms() map[string]string {
  f, err := os.Open("data/synonyms.json")
  if err != nil {
    log.Fatalf("could not read synonyms file")
  }

  b, err := ioutil.ReadAll(f)
  if err != nil {
    log.Fatalf("could not parse synonyms file as bytes")
  }

  var synonyms map[string]string
  json.Unmarshal([]byte(b), &synonyms)
  
  return synonyms
}

func getData() ([]string, map[string]string) {
  t := getTitles()
  s := getSynonyms()
  return t, s
}
