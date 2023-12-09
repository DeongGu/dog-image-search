export default class SearchResult {
  $target = null;
  DATA = null;

  constructor({ $target, initData, onClick }) {
    this.$target = $target;
    this.DATA = initData;
    this.onClick = onClick;

    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    this.$target.appendChild(this.$searchResult);
  }

  render() {
    const images = [];
    this.DATA.map((dog) => {
      dog.images.forEach((image) => {
        images.push(image.largeImageURL);
      });
    });
    images.map((item) => {
      this.$searchResult.innerHTML += `<img src=${item} />`;
    });
  }

  setState(newData) {
    this.DATA = newData;
    this.render();
  }
}
