export function formattingData(string) {
  // delete space
  string = string.trim();

  // return a string in uppercase, without accents and parenthesis
  return string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s*\(.*?\)\s*/g, "")
    .toUpperCase();
}
