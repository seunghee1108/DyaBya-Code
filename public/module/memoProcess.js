import {createMemo} from "./createMemo.js";
import {saveMemo} from "./saveMemo.js";
import {loadMemo} from "./loadMemo.js";

export function memoProcess() {
  document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("hashchange", () => {
      const selectors = {
        memoForm: document.getElementById("memo-Form"),
        title: document.getElementById("title"),
        content: document.getElementById("content"),
        saveBtn: document.getElementById("saveBtn"),
        memoList: document.getElementById("memo-list"),
      };

      if (!selectors.memoList) {
        console.error("Memo list element not found!");
        return; // memoList를 찾을 수 없는 경우 함수를 종료
      }

      selectors.saveBtn.addEventListener("click", function (event) {
        // 이벤트의 기본 동작을 수행하지 않도록 막음
        event.preventDefault();

        const title = selectors.title.value;
        const content = selectors.content.value;

        if (!title) {
          alert("이름을 입력하세요.");
        } else if (!content) {
          alert("내용을 입력하세요.");
          return;
        }
        
        // 현재 날짜와 시간을 나타내는 메서드 + 문자열로 변환
        const timestamp = new Date().toLocaleString();

        // 새로운 메모 객체 생성
        const newMemo = {
          title: title,
          content: content,
          timestamp: timestamp,
        };

        saveMemo(newMemo);
        // 새로운 메모 생성하고 화면에 표시
        createMemo(newMemo.title, newMemo.content, newMemo.timestamp);
        // 내용 부분만 초기화 (이름은 저장되어 있음)
        selectors.content.value = "";
      });

      // 초기화 버튼
      const clearBtn = document.getElementById("clear");
      clearBtn.addEventListener("click", function () {
        localStorage.removeItem("memos"); // localStorage에서 'memos' 항목 제거
        selectors.memoList.innerHTML = ""; // memo-list 부분을 비움
      });

      loadMemo();
    });
  });
}
