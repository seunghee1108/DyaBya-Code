export function createElement(type, props, ...children) {
  return {type, props, children};
}
// head comoponent
export function component(stateData) {
  // 빈 배열로 지정
  const menuItems = [];
  // url의 hash change 기능
  // 값을 찾아 데이터를 반환하는 부분임
  for (let i = 0; i < stateData.length; i++) {
    const item = stateData[i];
    const menuItem = createElement(
      "li",
      {style: "margin:auto; list-style:none;"},
      // statData hash와 text값 가져옴
      createElement("a", {href: item.hash}, item.text)
    );
    menuItems.push(menuItem);
  }

  const menu = createElement(
    "ul",
    {
      style:
        "width: 100vw; height: 10vh; display: flex;  flex-direction: row; text-align: center; justify-content: center;      align-items: center;",
    },
    ...menuItems
  );

  const content = createElement("div", {}, ""); 
  return createElement("div", {}, menu, content); 
}

export function component2(elementNode, attributes, children) {
  let elementStr = `<${elementNode}`;
  // for문을 통해 key값을 찾아 ket 값에 맞는 attributes로 호출함
  for (let key in attributes) {
    // 문자열로 변환
    elementStr += ` ${key} = "${attributes[key]}"`;
  }
  elementStr += ">";

  // if문에 children 매개변수를 호출하여 담음
  if (children) {
    children.forEach((child) => {
      if (typeof child === "string") {
        elementStr += child;
      } else {
        elementStr += component(child.elementNode, child.attributes, child.children);
      }
    });
  }

  elementStr += `</${elementNode}>`;
  
  // 완성된 elmentStr 문자열을 반환
  return elementStr;
}

// render 함수를 통한 component 변환
export function render(virtualDom) {
  if (typeof virtualDom === "string") {
    return document.createTextNode(virtualDom);
  }
  const element = document.createElement(virtualDom.type);
  if (virtualDom.props) {
    
    // Object.entries() : 객체의 각 키-값 쌍을 [key, value] 형태의 배열로 반환하는 메서드
    for (const [key, value] of Object.entries(virtualDom.props)) {
      element.setAttribute(key, value);
    }
  }

  
  for (let i = 0; i < virtualDom.children.length; i++) {
    const child = virtualDom.children[i];
    // 재귀적으로 render 함수를 호출하여 자식을 처리함
    element.appendChild(render(child));
  }
  return element;
}
