// 로컬 스토리지에서 이전에 저장된 메모 목록을 불러옴
export function saveMemo(newMemo) {
  // 이전에 저장된 메모가 없는 경우 빈 배열을 사용 
  const memos = JSON.parse(localStorage.getItem("memos")) || [];
  memos.push(newMemo);
  // 배열을 JSON 문자열로 반환하여 로컬 스토리지에 저장
  localStorage.setItem("memos", JSON.stringify(memos));
}

