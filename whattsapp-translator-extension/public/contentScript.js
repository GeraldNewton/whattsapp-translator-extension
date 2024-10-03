let tar = null;
let btn;
let temp = () => {
  let id = setInterval(() => {
    tar = document.getElementById("main");
    if (tar) {
      clearInterval(id);
      start();
    }
  }, 1000);
};

const api=(text)=>{
  chrome.storage.sync.get(['receiver'], function(result) {
    console.log('Value currently is ' + result.receiver);
  });
  return "changed"
}

const changeLang = async (x) => {
  const old = x.querySelector(".selectable-text .selectable-text");
  if(old){
    translatedMessage = api(old.textContent);
    document.execCommand("selectAll", false, null);
    document.execCommand("insertText", false, translatedMessage);
  }
};

const start = () => {
  x = tar.querySelector("._ak1r");
  if (x) {
    let button = document.createElement("button");
    button.innerHTML = "change language";
    button.style.backgroundColor="green"
    button.style.marginBottom="13px"
    button.style.padding="4px"
    button.style.borderRadius="5px"
    button.style.fontWeight="500"
    button.style.color="white"
    button.onmousedown=()=>{
      button.style.backgroundColor="red"
    }
    button.onmouseup=()=>{
      button.style.backgroundColor="green"
    }
    button.addEventListener("click", async () => await changeLang(x));
    btn = x.appendChild(button);
  }
  check();
};
const check = () => {
  let id = setInterval(() => {
    let tar1 = document.getElementById("main");
    if (tar != tar1) {
      clearInterval(id);
      temp();
    }
  }, 1000);
};
temp();