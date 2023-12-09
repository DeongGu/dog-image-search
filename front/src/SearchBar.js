export default class SearchBar {
  constructor({ $target, onSearch }) {
    this.$target = $target;

    this.$searchInput = document.createElement("input");
    this.$searchInput.setAttribute("class", "searchInput");
    this.$searchInput.placeholder = "강아지 이름을 입력하세요 🐶";
    this.$target.appendChild(this.$searchInput);

    this.$searchInput.addEventListener("keydown", (e) => {
      if (e.code === "Enter" && !e.isComposing) {
        onSearch(e.target.value);
      }
    });
  }

  render() {}
}
