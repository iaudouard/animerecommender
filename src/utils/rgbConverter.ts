export function hexToRgbDictionary(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : "#fff";
}

export default function hexToRgbString(hex: string, opacity: number) {
  const dictionary = hexToRgbDictionary(hex);
  const rgba = `rgba(${dictionary["r"]}, ${dictionary["g"]}, ${dictionary["b"]},${opacity})`;
  return rgba;
}
