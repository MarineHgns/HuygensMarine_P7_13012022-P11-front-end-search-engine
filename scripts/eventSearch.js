import search from "./search.js";

export default function eventSearch() {
  document.getElementById("search").addEventListener("input", () => search());
}
