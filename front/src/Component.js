export default class Component {
  $target;
  $state;

  constructor($target) {
    this.$target = $target;
    this.init();
    this.render();
  }

  // 초기 상태값 세팅
  init() {}

  // 마운트 될 경우
  mounted() {}

  // UI
  template() {
    return "";
  }

  // 렌더링
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  // 상태 변화 후 재렌더링
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
