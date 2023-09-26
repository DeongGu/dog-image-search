console.log("app 동작 중입니다.");

function App() {
  const element = document.createElement("div");

  element.innerHTML = "웹팩으로 개발서버 열었음 핫리로드 설정 완료";

  return element;
}

document.body.appendChild(App());
