export default function containsObjTitle(array, object) {
  for (var i in array) {
    if (array[i]["title"] === object["title"]) {
      return true;
    }
  }
  return false;
}
