package main

import (
  "strings"

  "github.com/ka-weihe/fast-levenshtein"
)

type Entry struct {
  Title string
  Distance int
}

type EntrySlice []Entry

// returns index at which entry is empty
// returns -1 if there are no empty entries
func (es EntrySlice) EmptyIdx() int {
  for i, e := range es {
    if e.Title == "" {
      return i
    }
  }
  return -1
}

// returns tuple of (max distance, index)
func (es EntrySlice) MaxDis() (int, int) {
  // safe to initialize at these vals as neither the distance nor the index can be negative
  var max, idx = -1, -1
  for i, e := range es {
    if e.Distance > max {
      max, idx = e.Distance, i
    }
  }

  return max, idx
}

const (
  recsLen = 5
)

var titles, synonyms = getData()

func getAutocomplete(input string) EntrySlice {
  input = strings.ToLower(input)

  entries := EntrySlice{
    {},
    {},
    {},
    {},
    {},
  }

  for _, t := range titles {
    // calculating here because we are going to need it anyways
    d := levenshtein.Distance(input, t)
    title, ok := synonyms[t]
    if !ok {
      title = t
    }

    idx := entries.EmptyIdx()

    if idx != -1 {
      entries[idx] = Entry{
        Title: title,
        Distance: d,
      }
      continue
    }

    max, idx := entries.MaxDis()
    if d < max {
      entries[idx] = Entry{
        Title: title,
        Distance: d,
      }
    }
  }

  return entries
}

