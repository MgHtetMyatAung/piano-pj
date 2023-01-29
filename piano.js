const sounds = [
  {
    id: 1,
    sound: "A4",
    key: "a",
  },
  {
    id: 2,
    sound: "B4",
    key: "s",
  },
  {
    id: 3,
    sound: "C4",
    key: "d",
  },
  {
    id: 4,
    sound: "D4",
    key: "f",
  },
  {
    id: 5,
    sound: "E4",
    key: "j",
  },
  {
    id: 6,
    sound: "F4",
    key: "k",
  },
  {
    id: 7,
    sound: "G4",
    key: "l",
  },
  {
    id: 8,
    sound: "C5",
    key: ";",
  },
];

const keyboard = document.querySelector("#keyboard");
const text = document.querySelector("#text");
const recordLists = document.querySelector("#recordLists");
const saveBtn = document.querySelector("#saveBtn");
const clearBtn = document.querySelector("#clearBtn");
const listCount = document.querySelector("#listCount");
const noteLists = document.querySelector("#noteLists");

// functions
const createKey = (name) => {
  const div = document.createElement("div");
  div.classList.add("col", "border", "text-center", "py-5", "key");
  div.setAttribute("sound", name);
  div.innerText = name;
  return div;
};

const countList=() => {
    listCount.innerText= recordLists.children.length;
        // show note lists
    if(recordLists.children.length>0){
        noteLists.classList.remove("d-none");
        noteLists.classList.add("d-flex");
    }else{
        noteLists.classList.remove("d-flex");
        noteLists.classList.add("d-none");
    };
};

const playSound = (sound) => {
  text.value += sound + " ";
  const audio = new Audio("./sound/" + sound + ".mp3");
  audio.play();
};

const createLi = (text) => {
  const li = document.createElement("li");
  li.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "border",
    "p-2"
  );
  li.innerHTML = `
        <p class="m-0 user-select-none text-muted">${text}</p>
        <div class="d-flex gap-1">
            <button class="btn btn-sm btn-outline-danger delBtn">
                <i class="bi bi-trash pe-none"></i>
            </button>
            <button class="btn btn-sm btn-outline-dark playBtn">
                <i class="bi bi-play pe-none"></i>
            </button>
        </div>
    `;
  return li;
};

sounds.forEach((el) => {
  keyboard.append(createKey(el.sound));
});

[...document.querySelectorAll(".key")].forEach((el) => {
  el.addEventListener("click", (event) => {
    playSound(event.target.getAttribute("sound"));
  });
});

document.addEventListener("keyup", (event) => {
  const currentKey = sounds.find((el) => el.key === event.key);
  if (currentKey) {
    playSound(currentKey.sound);
    const currentSound = document.querySelector(
      "[sound=" + currentKey.sound + "]"
    );
    currentSound.classList.add("active");
    setTimeout(() => {
      currentSound.classList.remove("active");
    }, 100);
  }
});

saveBtn.addEventListener("click", () => {
  if (text.value) {
    recordLists.append(createLi(text.value));
    text.value = "";
    countList();
  }
});

clearBtn.addEventListener("click",()=>{
    if(text.value){
        text.value="";
    }
});


// record play and delete
recordLists.addEventListener("click",(event) => {
   if(event.target.classList.contains("playBtn")){
    const currentRecord =event.target.closest("li").querySelector("p").innerText;
    const recordArr=currentRecord.split(" ");
    event.target.querySelector("i").classList.replace("bi-play","bi-pause");
    event.target.closest("li").querySelector("p").classList.replace("text-muted","text-primary");
    recordArr.forEach((el,i)=>{
        const currentSound = document.querySelector(
            "[sound=" + el + "]"
          );
        setTimeout(()=>{
            currentSound.classList.add("active");
            playSound(el);
        },i*500);
        setTimeout(()=>{
            currentSound.classList.remove("active");
        },(i*500)+100);
    });
    setTimeout(()=>{
        event.target.querySelector("i").classList.replace("bi-pause","bi-play");
        event.target.closest("li").querySelector("p").classList.replace("text-primary","text-muted");
        text.value="";
    },recordArr.length*500);
   }else if(event.target.classList.contains("delBtn")){
    if(confirm("Are you sure to delete record?")){
        event.target.closest("li").remove();
        countList();
    }
   };
});


