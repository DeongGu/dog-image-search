export default class SearchResult {
  $target = null;
  DATA = null;

  constructor({ $target, initData, onClick }) {
    this.$target = $target;
    this.DATA = initData;
    this.onClick = onClick;

    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "searchResult";
    this.$target.appendChild(this.$searchResult);
  }

  render() {
    this.$searchResult.innerHTML = "";

    this.DATA.map((dog) => {
      dog.images.forEach((image) => {
        this.$searchResult.innerHTML += `
          <div class="item">
            <img src=${image.largeImageURL} alt=${dog.name} />
          </div>`;
      });
    });

    const items = document.querySelectorAll(".item");
    items.forEach((item) => {});
  }

  setState(newData) {
    this.DATA = newData;
    this.render();
  }
}
