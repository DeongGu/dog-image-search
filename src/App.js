import "./style.css";
console.log("app 동작 중입니다.");

function App() {
  const element = document.createElement("div");
  const el = document.querySelector("#App");
  element.innerHTML = "웹팩으로 개발서버 열었음 핫리로드 설정 완료";
  el.innerHTML = "왜 css 로더 안됨?";
  return element;
}

document.body.appendChild(App());
