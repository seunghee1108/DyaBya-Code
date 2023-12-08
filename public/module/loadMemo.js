import {createMemo} from "./createMemo.js";

// 로컬 스토리지에서 메모를 불러와 화면에 표시하는 함수
export function loadMemo() {
  const selectors = {
    memoList: document.getElementById("memo-list"),
  };

  const memos = JSON.parse(localStorage.getItem("memos")) || [];
  selectors.memoList.innerHTML = "";
  // 배열 순회하면서 memo에 대해 createMemo 함수를 호출
  memos.forEach((memo) => createMemo(memo.title, memo.content, memo.timestamp));
}
