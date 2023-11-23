import "./style.css";
import SearchBar from "./SearchBar.js";

export default class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    // 검색 창
    this.searchBar = new SearchBar({
      $target,
      onSearch: (keyword) => {},
    });

    // // 검색 결과
    // this.searchResult = new SearchResult({
    //   $target,
    //   initData: this.data,
    //   onClick: (image) => {},
    // });

    // // 모달 창
    // this.imageInfo = new ImageInfo({ $target });
  }

  setState(newData) {
    this.data = newData;
    this.searchResult.setState(newData);
  }
}
