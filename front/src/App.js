import "./style.css";
import SearchBar from "./SearchBar.js";
import SearchResult from "./SearchResult.js";
import api from "./api.js";

export default class App {
  $target = null;
  DATA = [];

  constructor($target) {
    this.$target = $target;

    // 검색 창
    this.searchBar = new SearchBar({
      $target,
      onSearch: async (keyword) => {
        try {
          const data = await api.fetchDogs(keyword);
          this.setState(data);
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      },
    });

    // 검색 결과
    this.searchResult = new SearchResult({
      $target,
      initData: this.DATA,
      onClick: (image) => {},
    });

    // // 모달 창
    // this.imageInfo = new ImageInfo({ $target });
  }

  setState(newData) {
    this.DATA = newData;
    this.searchResult.setState(newData);
  }
}
