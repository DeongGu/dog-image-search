export default class SearchBar {
  constructor({ $target, onSearch }) {
    this.$target = $target;
    this.onSearch = onSearch;

    const $searchInput = document.createElement("input");
    $searchInput.setAttribute("class", "searchInput");
    $searchInput.placeholder = "강아지 이름을 입력하세요";
    this.$target.appendChild($searchInput);
  }

  render() {}
}
