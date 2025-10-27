

const path = [
              "Desktop","Desktop/Portifolio","Desktop/Portifolio/contatos",
              "Desktop/Portifolio/habilidades","Desktop/Portifolio/Projetos",
             "Desktop/TrashCan"
            ]

let actualPath = path[0];
let terminalIdentifier = "PedroSabino@PedroSabino-desktop:~" + actualPath + "$";
let ordem = ["fireFoxTab", "blankFolderTab", "docTab", "helpTab", "trashCanTab","textReader"];


let openTabs = {
  fireFoxTab: false,
  blankFolderTab: false,
  docTab: false,
  helpTab: false,
  trashCanTab: false
}

function showDate() {
    
    const monthNames = ["jan", "fev", "mar", "abr", "maio", "jun", "jul", "ago", "set", "out", "nov", "dez"];
    const now = new Date();
    var dateHour = document.getElementById('dateHour');
    var newDate = now.getDate() + " de " + monthNames[now.getMonth()] + " " + now.getHours() + ":" + now.getMinutes();


    if (now.getMinutes() < 10) {
        newDate = now.getDate() + " de " + monthNames[now.getMonth()] + " " + now.getHours() + ":0" + now.getMinutes();
    }
    dateHour.innerText = newDate;

}

window.addEventListener('load',showDate)

function showTime(){

    const now = new Date();
    var newTime = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
    var dateHour = document.getElementById('dateHour');

    if(now.getMinutes() < 10){
        newTime = now.getHours()+":0"+now.getMinutes()+":"+now.getSeconds();
    }
    dateHour.innerText = newTime;
}

function atualizarOrdem(novo) {
  // remove se já existir e coloca no topo
  ordem = ordem.filter(id => id !== novo);
  ordem.unshift(novo);
  atualizarZIndex();
}

function atualizarZIndex() {
  const base = 10; // diferença mínima entre z-indexes
  ordem.forEach((id, i) => {
    const elemento = document.getElementById(id);
    if (elemento) {
      // quanto mais à frente na array, maior o z-index
      elemento.style.zIndex = (ordem.length - i) * base;
    }
  });
}

const floatingTabs = document.querySelectorAll(".floatingTabs");

floatingTabs.forEach(tab => {
  // Clique normal
  tab.addEventListener("click", () => {
    atualizarOrdem(tab.id);
  });

  // Segurar o botão (mousedown)
  tab.addEventListener("mousedown", () => {
    atualizarOrdem(tab.id);
  });
});

// Inicializa os z-index ao carregar
atualizarZIndex();
const elementCK = document.querySelectorAll(".isOpenedCk");

elementCK.forEach(element => {

    element.addEventListener('change',() =>{

      let nomeElemento = element.id;
      let tabName = " ";

      if(element.checked){
      
      if(nomeElemento === "fireFoxCk"){
        if(!openTabs.fireFoxTab){
          openTabs.fireFoxTab = true;
        }
        tabName = "fireFoxTab"
      }

      else if(nomeElemento === "blankFolderCk"){
        if(!openTabs.blankFolderTab){
          openTabs.blankFolderTab = true;
          changePathName(0)
        }
        tabName = "folderTab"
      }

      else if(nomeElemento === "docCk"){
        openTabs.docTab = true;
        tabName = "docTab"
      }

      else if(nomeElemento === "helpCk"){
        openTabs.helpTab= true;
        tabName = "helpTab"
      }

      else if(nomeElemento === "trashCanCk"){
      if(!openTabs.trashCanTab){
          openTabs.trashCanTab = true;
        }
        openTabs.trashCanTab = true;
        tabName = "trashCanTab"
      }

      abrirAbas(tabName);
    }
    else{

      if(nomeElemento === "fireFoxCk"){
         document.getElementById("fireFoxTab").style.opacity = 0
      }

      else if(nomeElemento === "blankFolderCk"){
        document.getElementById("folderTab").style.opacity = 0
         document.getElementById("folderTab").style.display = "none";
      }

      else if(nomeElemento === "docCk"){
        
      }

      else if(nomeElemento === "helpCk"){
        
      }

      else if(nomeElemento === "trashCanCk"){
        document.getElementById("trashCanTab").style.opacity = 0
        document.getElementById("trashCanTab").style.display = "none";
      }
    }

    updateBackGround()
    
    })});


const btnClose = document.querySelectorAll(".closeIcon");

btnClose.forEach(btn =>{
  btn.addEventListener('click',function(){
    
    let idDoBotao = btn.id;
    if(idDoBotao === "closeIcon-blankFolder"){
      let elemento = document.getElementById("folderTab");
      elemento.style.opacity ="0";
      elemento.style.display = "none";
      openTabs.blankFolderTab = false;
      document.getElementById("blankFolderCk").checked = false
      document.getElementById("trashCanCk").checked = false
      changePathName(0) 
    }
    else if(idDoBotao === "closeIcon-fireFoxTab"){
      let elemento = document.getElementById("fireFoxTab");
      elemento.style.opacity ="0";
      elemento.style.display = "none";
      openTabs.fireFoxTab = false;
      document.getElementById("fireFoxCk").checked = false
    }
    else if(idDoBotao === "closeIcon-trashCanTab"){
      let elemento = document.getElementById("trashCanTab");
      elemento.style.opacity ="0";
      elemento.style.display = "none";
      openTabs.trashCanTab = false;
      document.getElementById("trashCanCk").checked = false
    }
    else if(idDoBotao === "closeIcon-textReader"){
      closeTextReader()
    }
   
    updateBackGround()

    
  })
})


const btnMin = document.querySelectorAll(".minBtn");

btnMin.forEach(btn =>{
  btn.addEventListener('click',function(){
    
    let idDoBotao = btn.id;
    if(idDoBotao === "minBtn-blankFolder"){
      let elemento = document.getElementById("folderTab");
      elemento.style.opacity ="0";
      elemento.style.display = "none";
      document.getElementById("blankFolderCk").checked = false 
      
    }
    else if(idDoBotao === "minBtn-trashCanTab"){
      let elemento = document.getElementById("trashCanTab");
      elemento.style.opacity ="0";
      elemento.style.display = "none";
      document.getElementById("trashCanCk").checked = false 
      
    }
    else if(idDoBotao === "minBtn-textReader"){
      closeTextReader()
    }

    updateBackGround()
  })
})

const closeTabAlternative = document.getElementById("closeFireFox")
closeTabAlternative.onclick = function(){
let elemento = document.getElementById("fireFoxTab");
      elemento.style.opacity ="0";
      elemento.style.display = "none";
      openTabs.fireFoxTab = false;
      document.getElementById("fireFoxCk").checked = false

      updateBackGround() 

}



function abrirAbas(elementoId){

    let elemento2 = document.getElementById(elementoId)
    pageBorn(elemento2);

}
document.getElementById("foldDesk").ondblclick = function(){
  openTabs.blankFolderTab = true;
  document.getElementById("blankFolderCk").checked = true 
  changePathName(1);
  abrirAbas("folderTab");
  updateBackGround();
}

function updateBackGround() {
  const menus = document.querySelectorAll(".selectionMenu");

  menus.forEach(menu => {
    const checkbox = menu.querySelector(".isOpenedCk");
    const checkboxId = checkbox.id;
    const tabName = checkboxId.replace("Ck", "Tab");

    // Remove todas as classes de controle
    menu.classList.remove("show-after", "active", "inactive", "bg-active");

    // Se a aba estiver aberta
    if (openTabs[tabName]) {
      menu.classList.add("show-after"); // after aparece
      if (checkbox.checked) {
        menu.classList.add("active", "bg-active"); // checkbox marcada → after grande + background
      } else {
        menu.classList.add("inactive"); // checkbox desmarcada → after pequeno, sem background
      }
    }
    // Se aba fechada → nada aparece (nenhuma classe)
  });
}

// Inicializa
updateBackGround();


function pageBorn(elemento){
  let element = elemento;
    
  const x = Math.random() * (950 - 700) + 700
  const y = Math.random() * (200 - 100) + 100

  if(element.style.opacity === "0"){
     element.style.left = x + 'px'
    element.style.top = y + 'px'
   }

  element.style.opacity = "1";
  element.style.display = "block";

}

function changePathName(num){
  
  actualPath=path[num]

  let absolutePath = "/home/PedroSabino/" + actualPath;

  let elements = document.getElementsByClassName('tabPath')


  for (let element of elements) {
    element.innerText = actualPath

    element.addEventListener('mouseover', () => {
      element.innerText = absolutePath
    })

    element.addEventListener('mouseout', () => {
      element.innerText = actualPath
    })

  let elementsT = document.getElementsByClassName('tabPathT')[0]

  elementsT.innerText = path[5];

  elementsT.addEventListener('mouseover', () => {
      elementsT.innerText = "/home/PedroSabino/" + path[5]
    })

    elementsT.addEventListener('mouseout', () => {
      elementsT.innerText = path[5]
    })

}

  updateFolderContent();
  updateButtons();

}



const img = document.getElementById('changeImg');
const toggle = document.getElementById('changeThemeCk');

let animationFrame;
let rotacao = 0;
let velocidade = 0;
let acelerando = true;
let estadoDaCk = false;


toggle.addEventListener('change', () => {
  estadoDaCk = toggle.checked;
  document.body.classList.toggle('ligthMode');
  rotacao = 0;
  velocidade = 0;
  acelerando = true;
  animate();

});

function animate() {
  cancelAnimationFrame(animationFrame);

  function step() {
    if (acelerando) {
      velocidade += 0.5; // aceleração
      if (velocidade >= 20) acelerando = false; // atinge velocidade máxima
    } else {
      velocidade *= 0.95; // desaceleração gradual
      if (velocidade < 0.1) velocidade = 0;
    }

    rotacao += velocidade;
    img.style.transform = `rotate(${rotacao}deg)`; //  giro completo ao redor do centro

    if (velocidade > 0) {
      animationFrame = requestAnimationFrame(step);
    } else {
      // define a imagem final e reseta a rotação
      if(estadoDaCk){
        img.src = 'imagens/Sun.png';
      }else{
        img.src = 'imagens/Full-Moon.png';
      }
    }
  }

  step();
}

let newX = 0, newY = 0, startX = 0, startY = 0;

const topBar = document.querySelectorAll('[id*="top_"]');

topBar.forEach(bar => {
  bar.addEventListener('mousedown', (e) => mouseDown(e, bar));
});

function mouseDown(e, bar) {
  e.preventDefault();

  const aba = bar.closest(".floatingTabs");

  startX = e.clientX;
  startY = e.clientY;

  function onMouseMove(event) {
    mouseMove(event, aba);
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

function mouseMove(e, aba) {
  e.preventDefault();

  const tab = aba;

  newX = startX - e.clientX;
  newY = startY - e.clientY;

  startX = e.clientX;
  startY = e.clientY;

  let nextLeft = tab.offsetLeft - newX;
  let nextTop = tab.offsetTop - newY;

  const maxX = window.innerWidth + 400 - tab.offsetWidth;
  const maxY = window.innerHeight + 400 - tab.offsetHeight;

  nextLeft = Math.max(0, Math.min(nextLeft, maxX));
  nextTop = Math.max(0, Math.min(nextTop, maxY));

  tab.style.left = nextLeft + 'px';
  tab.style.top = nextTop + 'px';
}


function pageOpened(e,referenteTab){
 
}

let files = document.querySelectorAll(".file")

files.forEach(element =>{
  
  openTerminal(element)

  element.addEventListener('dblclick',(e)=>{
    
    console.log(element)
    
    if(e.currentTarget.id === "sobreMim"){
      openTextReader("sobreMim")
    }
    else if(e.currentTarget.id === "hab"){
      goTo(3)
    }
    else if(e.currentTarget.id === "contato"){
       goTo(2)
    }
    else if(e.currentTarget.id === "projetos"){
       goTo(4)
    }
    else if(e.currentTarget.id === "portifolio"){
      goTo(1)
    }
    if(e.currentTarget.id === "theLastFall"){
      openTextReader("theLastFall")
    }
    if(e.currentTarget.id === "cuboMagico"){
      openTextReader("cuboMagico")
    }
    if(e.currentTarget.id === "binaryGame"){
      openTextReader("binaryGame")
    }                                                               
  })
})

function openTerminal(element){
  if(element.classList.contains('port_exe')){

  }
}

function openTextReader(content){
  let btnTxt = document.getElementById("btnFTxt")
  closeTextReader();
  abrirAbas("textReader")
  
 
  document.getElementById("fileName").innerHTML = content + ".txt"

  let file = document.getElementById(content + "-txt")



  file.style.opacity = "1";
  file.style.display = "block";

  if(file.classList.contains("project")){
    btnTxt.classList.add("showing")

    if(content === "binaryGame"){
      btnTxt.onclick = () => {
        window.open("https://github.com/Sabinosm/BinareGame","_blank")
      };
    }
    else if(content === "theLastFall"){
      btnTxt.onclick = () => {
        window.open("https://github.com/Sabinosm/TheLastFall","_blank")
      };
    }
    else if(content === "cuboMagico"){
      btnTxt.onclick = () => {
        window.open("https://github.com/Sabinosm/cuboMagico","_blank")
      };
      
    }

  }
  else{
    btnTxt.classList.remove("showing")
  }

} 
function closeTextReader(){
  let tR = document.getElementById("textReader")
  tR.style.opacity = "0";
  tR.style.display = "none";

  const textos = document.querySelectorAll(".project")

  textos.forEach(e => {
    e.style.opacity = "0";
    e.style.display = "none";
  })

  let sbMim = document.getElementById("sobreMim-txt")

  sbMim.style.opacity = "0";
  sbMim.style.display = "none";

}

function openPdfReader(content){

}


let navsFolderC = document.querySelectorAll(".default")

function updateFolderContent() {
  for (let nav of navsFolderC) {
    nav.style.opacity = "0";
    nav.style.display = "none";
  }

  if (actualPath === path[0]) showFolder("desktopFold");
  else if (actualPath === path[1]) showFolder("principal");
  else if (actualPath === path[2]) showFolder("contactFolder");
  else if (actualPath === path[3]) showFolder("habFolder");
  else if (actualPath === path[4]) showFolder("projFolder");
}

function showFolder(id) {
  const folder = document.getElementById(id);
  if (folder) {
    folder.style.opacity = "1";
    folder.style.display = "flex";
  }
}

let currentIndex = 0;
let historyBack = [];
let historyForward = [];

let goBack = document.getElementById("goBack")
let goFront = document.getElementById("goFront")



const pathChangers = document.querySelectorAll(".containerDesktop")

pathChangers.forEach(e=>{
  e.addEventListener('click', () => {
    
  if(e.id === "desktopC"){
    changePathName(0)
  }
  else if(e.id === "desktopCT"){
    changePathName(0)
    abrirAbas("folderTab")
  }
  else{
    abrirAbas("trashCanTab")
    openTabs.trashCanTab = true;
    document.getElementById("trashCanCk").checked = true
    updateBackGround()
  }

 
  }
)
 
})

function updateButtons() {
  if (historyBack.length > 0) {
    goBack.style.pointerEvents = "auto";
    goBack.style.filter = "brightness(100%)";
  } else {
    goBack.style.pointerEvents = "none";
    goBack.style.filter = "brightness(50%)";
  }

  if (historyForward.length > 0) {
    goFront.style.pointerEvents = "auto";
    goFront.style.filter = "brightness(100%)";
  } else {
    goFront.style.pointerEvents = "none";
    goFront.style.filter = "brightness(50%)";
  }
}

function goTo(index) {
  //se o index for diferente do indexAtual e o index for maior ou igual a 1, e o index for menor que < o tamanho da array -> path

  if (index !== currentIndex && index >= 1 && index < path.length) {
    historyBack.push(currentIndex);
    currentIndex = index;
    historyForward = []; // limpa caminhos futuros
    changePathName(currentIndex);
  }
}

goBack.onclick = function () {
  if (historyBack.length > 0) {
    historyForward.push(currentIndex);
    currentIndex = historyBack.pop();
    changePathName(currentIndex);
    
    
  }
};

goFront.onclick = function () {
  if (historyForward.length > 0) {
    historyBack.push(currentIndex);
    currentIndex = historyForward.pop();
    changePathName(currentIndex);
  }
};

// Inicia o estado
changePathName(0);
updateButtons();

const restart = document.querySelectorAll(".reboot")
const contentFF = document.getElementById('contentFF');

restart.forEach(ele => {
  ele.addEventListener('click', reboot);
  
})

function reboot(){
  contentFF.classList.add('hidden');

  // após a transição, “reinicia” (fade-in)
  setTimeout(() => {
    contentFF.classList.remove('hidden');
  }, 100);
}

let input = document.getElementById("textSearch")
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    reboot()
    input.value = ""
  }
});

