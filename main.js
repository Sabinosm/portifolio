

const path = [
              "Desktop","Desktop/portifolio","Desktop/portifolio/contatos",
              "Desktop/portifolio/habilidades","Desktop/portifolio/Projetos",
             "Desktop/TrashCan"
            ]

let actualPath = path[0];
const pathTerminal = [
              "/portifolio","/portifolio/contatos",
              "/portifolio/habilidades","/portifolio/Projetos"
]
let actualPathTerminal = pathTerminal[0]
let terminalIdentifier = "PedroS@-desktop:~" + actualPathTerminal + ":";
let ordem = ["fireFoxTab", "blankFolderTab", "docTab", "helpTab", "trashCanTab","textReader","docTab"];
let typingProcess = false; // guarda a promise em execução
let stopTyping = false;  

let openTabs = {
  fireFoxTab: false,  
  blankFolderTab: false,
  docTab: false,
  helpTab: false,
  trashCanTab: false,
  optionsTab: false
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
        if(!openTabs.docTab){
          openTabs.docTab = true;
          openTerminal()
          actualPathTerminal = pathTerminal[0]
        }
        tabName = "docTab"
        
      }

      else if(nomeElemento === "helpCk"){
        if(!openTabs.helpTab){
          openTabs.helpTab = true;
        }
        tabName = "helpTab"
      }

      else if(nomeElemento === "trashCanCk"){
        openTabs.trashCanTab = true;
        tabName = "trashCanTab"
      }

      else if(nomeElemento === "optionsCk"){
        if(!openTabs.optionsTab){
          openTabs.optionsTab = true;
        }
        tabName = "optionsTab"
        abrirOuFecharOptions(true)
      }
      
      if(tabName !== "optionsTab"){
          abrirAbas(tabName);
      }
      
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
        closeTerminal(false)
      }

      else if(nomeElemento === "helpCk"){
        document.getElementById("helpTab").style.opacity = 0
        document.getElementById("helpTab").style.display = "none";
      }

      else if(nomeElemento === "trashCanCk"){
        document.getElementById("trashCanTab").style.opacity = 0
        document.getElementById("trashCanTab").style.display = "none";
      }

      else if(nomeElemento === "optionsCk"){
        abrirOuFecharOptions(false)
      }
    
    }

    updateBackGround()
    
    })});

function abrirOuFecharOptions(simOuNao){
  let t = document.getElementById("optionsTab")
  let o = document.getElementById("options")
  if(simOuNao){
    document.getElementById("todos").click()
  t.style.opacity = "0.8"
  t.style.display = "flex"
  openTabs.optionsTab = true;
  o.classList.add("bg")
    document.getElementById("optionsCk").checked = true;
  }
  else{
  o.classList.remove("bg")
  t.style.opacity = "0"
  t.style.display = "none"
  openTabs.optionsTab = false;
  document.getElementById("optionsCk").checked = false;
  }
 
}

const optU = document.querySelectorAll(".divUbuntu")

optU.forEach(div => {
  div.addEventListener('click', () => {
    abrirOuFecharOptions(false)
    if(div.id ==="BF"){
      document.getElementById("blankFolderCk").click();
    }
    else if(div.id ==="LX"){
      document.getElementById("trashCanCk").click();
    }
    else if(div.id ==="HE"){
      document.getElementById("helpCk").click();
    }
    else if(div.id ==="FF"){
      document.getElementById("fireFoxCk").click();
    }
    else{
      document.getElementById("docCk").click(); //portifolio
    }
  })
})




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
    else if(idDoBotao === "closeIcon-pdfReader"){
      closePdfReader()
    }
    else if(idDoBotao === "closeUbuntu"){
     
        abrirOuFecharOptions(false)
     
        
      }
    else if(idDoBotao === "closeIcon-docTab"){
        if(typingProcess === false){
        closeTerminal(true)
      }
      else{
        alert("Não feche antes do término da inicialização do programa!")
      }
      }
    else if(idDoBotao === "closeIcon-helpTab"){
      let elemento = document.getElementById("helpTab");
      elemento.style.opacity ="0";
      elemento.style.display = "none";
      openTabs.helpTab = false;
      document.getElementById("helpCk").checked = false
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
    else if(idDoBotao === "minBtn-pdfReader"){
      closePdfReader()
    }
    else if(idDoBotao === "minBtn-docTab"){
      closeTerminal()
      }
    else if(idDoBotao === "minBtn-helpTab"){
      let elemento = document.getElementById("helpTab");
      elemento.style.opacity ="0";
      elemento.style.display = "none";
      document.getElementById("helpCk").checked = false 
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
    atualizarOrdem(elementoId)
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

let files = document.querySelectorAll(".file")

files.forEach(element =>{
  

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
    else if(e.currentTarget.id === "theLastFall"){
      openTextReader("theLastFall")
    }
    else if(e.currentTarget.id === "cuboMagico"){
      openTextReader("cuboMagico")
    }
    else if(e.currentTarget.id === "binaryGame"){
      openTextReader("binaryGame")
    }   
    else if(e.currentTarget.id === "habPdf") {
      openPdfReader("habilidades")
    }
    else if(e.currentTarget.id === "currPdf") {
      openPdfReader("curriculo")
    }                                                                 
  })
})


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
 
  const elements = document.querySelectorAll(".btnPdf")

  abrirAbas("pdfReader")

  document.getElementById("fileNamePdf").innerHTML = content + ".pdf"
  let file = document.getElementById(content+"-pdf")
  console.log(file)
  console.log(content)
  file.style.opacity = "1"
  file.style.display = 'block'
  
 if(content === "curriculo"){
     elements.forEach(e=>{
    if(e.id === "otherPage"){
       e.onclick = () => {
        window.open("imagens/PSSM_curriculo.pdf","_blank")
       }
    }
    else{
      e.onclick = () => {
        const link = document.createElement('a');
        link.href = 'imagens/PSSM_curriculo.pdf';          // caminho do arquivo
        link.download = 'curriculo-Pedro-Sabino.pdf';  // nome que será salvo
        link.click(); 
       }
    }
  })
 }
 else{
  elements.forEach(e=>{
  if(e.id === "otherPage"){
       e.onclick = () => {
        window.open("imagens/habilidades.pdf","_blank")
       }
    }
    else{
      e.onclick = () => {
        const link = document.createElement('a');
        link.href = 'imagens/habilidades.pdf';          // caminho do arquivo
        link.download = 'habilidades.pdf';  // nome que será salvo
        link.click(); 
       }
    }
  })
 }

  
}
function closePdfReader(){
  let pdf = document.getElementById("pdfReader")
  pdf.style.opacity = "0";
  pdf.style.display = "none";

  const imagens = document.querySelectorAll(".pdfs")
  imagens.forEach(e => {
    e.style.opacity = "0";
    e.style.display = "none";
  })
  
  const pdfs = document.querySelectorAll(".pdfs-img")

  pdfs.forEach(e => {
    e.style.opacity = "0"
    e.style.display = "none"
  })


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

const links = document.querySelectorAll('[id$="Link"]')

links.forEach(link=>{
  link.addEventListener('dblclick', () => {
    linkMove(link.id)
  })

     
})

function linkMove(link) {
  if (link === "gitLink") {
    window.open("https://github.com/Sabinosm", "_blank");
  } 
  else if (link === "zapLink") {
    window.open("https://wa.me/5531999268312", "_blank");
  } 
  else if (link === "linkedinLink") {
    window.open("https://www.linkedin.com/in/pedro-sabino-santos-machado", "_blank");
  } 
  else {
    const texto = "https://mail.google.com/mail/u/0/?pli=1#inbox?" +
      "compose=GTvVlcSDbhbDwbkCKRRMfWzfJtZdJQoRknLrndgq" +
      "qxJNBthJWqbZwrccBLkHCrzxwgmvCzQPqvcpq";

    navigator.clipboard.writeText(texto)
      .then(() => {
        alert("Link copiado!");
        window.open(texto, "_blank");
      })
      .catch(err => console.error("Erro:", err));
  }
}


function searchBar() {
  const nomes = document.querySelectorAll(".searchContent");
  let searchText = document
    .getElementById("searchUbuntu")
    .value.toLowerCase()
    .replace(/\s+/g, "");   

  nomes.forEach(element => {
    let respectiveDiv = element.closest(".divUbuntu");
    respectiveDiv.style.opacity = "0";
    respectiveDiv.style.display = "none";

    let textoE = element.innerText
      .toLowerCase()
      .replace(/\s+/g, ""); 

    if (textoE.includes(searchText)) {
      respectiveDiv.style.opacity = "1";
      respectiveDiv.style.display = "flex";
    }
  });

}
function choosen(elemento){
  if(elemento.id === "todos"){
    document.getElementById("frequente").classList.remove("choosen")
    elemento.classList.add("choosen")
  }
  else{
    document.getElementById("todos").classList.remove("choosen")
    elemento.classList.add("choosen")
  }
  const  x = document.querySelectorAll(".divUbuntu")

  x.forEach(x => {
    x.style.opacity = "0"
    x.style.display = "none"

  setTimeout(() =>{
    x.style.opacity = "1"
    x.style.display = "flex"
  },200)
  })

  
}

const output = document.getElementById("output");
const inicializando = document.getElementById("inicializando");
const terminalTab = document.getElementById("docTab");
const containerTexto = document.getElementById("textTerminal");
const fakeInput = document.getElementById("terminalInput");
const containerInput = document.getElementById("terminalContainerInput");
let preInput = document.getElementById("contentPreInput");
let actualInput = document.getElementById("terminalInput").innerText;
let command = actualInput.split(" ")[1];

const longArray = output.innerText.split("\n");

// Foco automático ao clicar no terminal
containerTexto.onclick = () => fakeInput.focus();

// Atualiza os identificadores do terminal
function terminalId() {
  document.querySelectorAll(".terminalIdentifier").forEach(e => {
    e.innerHTML = terminalIdentifier;
  });
}


// Digitação com efeito (simulação de boot)
async function digitarTexto() {
  if (typingProcess) return;
  typingProcess = true
  stopTyping = false; 

  for (let index = 0; index < longArray.length; index++) {
    if (stopTyping) {
      console.log("Programa fechado durante a digitação!");
      return; // sai imediatamente
    }

    const element = longArray[index];
    await digitarLinha(element);
    await new Promise(r => setTimeout(r, 0.2))
  }
  readyAparecendo(true);
  await carregarPorcentagem();

  document.getElementById("sistemReady").style.opacity = "1";
  document.getElementById("sistemReady").style.display = "block";

  
  setTimeout(() => {
    fakeClear(1, preInput);
    containerTexto.scrollTop = containerTexto.scrollHeight;
    preInput.innerHTML += `<span class="terminalIdentifier" contenteditable="false"></span> <br><br>${pathText(1)}`;
    containerTexto.scrollTop = containerTexto.scrollHeight;
    terminalId();
  }, 2000);
  
  containerInput.style.opacity = "1";
  containerInput.style.display = "flex";

  typingProcess = false
}

async function digitarLinha(texto, delay = 0.2) {
  for (let char of texto) {
    output.innerHTML += char;
    containerTexto.scrollTop = containerTexto.scrollHeight;
    await new Promise(r => setTimeout(r, delay));
  }
  output.innerHTML += "<br>";
  containerTexto.scrollTop = containerTexto.scrollHeight;
}


async function carregarPorcentagem() {
  inicializando.innerText = "Inicializando: 0%";
  for (let i = 0; i <= 100; i++) {
    inicializando.innerText = `Inicializando: ${i}%`;
    await new Promise(r => setTimeout(r, 10));
  }
  inicializando.innerHTML = "Inicialização concluída.";
  containerTexto.scrollTop = containerTexto.scrollHeight;
}



function fecharPrograma() {
  stopTyping = true;
}

async function openTerminal() {
  terminalId();
  output.innerText = "";
  abrirAbas("docTab")

  await digitarTexto()
  containerTexto.scrollTop = containerTexto.scrollHeight;

}

function closeTerminal(definitivo) {
  if(definitivo){
    readyAparecendo(false);
    fecharPrograma()
    openTabs.docTab = false
    docCk.checked = false
    terminalTab.style.opacity = "0";
    terminalTab.style.display = "none";
    containerInput.style.opacity = "0";
    containerInput.style.display = "none";
    containerTexto.scrollTop = containerTexto.scrollHeight;
    preInput.innerHTML = " ";
    output.innerText = " ";
    
    document.getElementById("sistemReady").style.opacity = "0";
    document.getElementById("sistemReady").style.display = "none";

  }else{
    terminalTab.style.opacity = "0";
    terminalTab.style.display = "none";
  }
 
}

function readyAparecendo(sim) {
  const readys = document.querySelectorAll(".sequencyReady");
  if(sim){
      readys.forEach((e, i) => {
    setTimeout(() => {
      e.style.opacity = "1";
      e.style.display = "block";
      containerTexto.scrollTop = containerTexto.scrollHeight;
    }, i * 200);
  });
  }
  else{
    readys.forEach((e) => {
    setTimeout(() => {
      e.style.opacity = "0";
      e.style.display = "none"
    }, 1);
  });
  }
}

function fakeClear(num, place) {
  while (num > 0) {
    num--;
    place.innerHTML += "<br>";
  }
}


function adicionarLinhaTerminal(conteudoHTML) {
  const linha = document.createElement("div");
  linha.classList.add("linhaTerminal");
  linha.innerHTML = conteudoHTML;
  preInput.appendChild(linha);
  containerTexto.scrollTop = containerTexto.scrollHeight;
}

// Exibe resultados do terminal (saída de texto)
function printTerminalOutput(texto, cor = "#ccc") {
  const linha = document.createElement("div");
  linha.classList.add("saidaTerminal");
  linha.style.color = cor;
  linha.innerHTML = texto;
  preInput.appendChild(linha);
  containerTexto.scrollTop = containerTexto.scrollHeight;
}

// Textos de cada seção
function pathText(qual) {
  let t;
  if (qual === 1) {
    t = `Bem-vindo ao meu portfólio! <br>
        > Use comandos ao estilo Linux se quiser um desafio. <br>
        > Explore pelos números para um caminho mais rápido. <br>
        > Ou simplesmente navegue pelas pastas de acordo com sua preferência. <br>
        <br>
        [ 1 ]  Sobre mim           → Conheça mais sobre quem eu sou <br>
        [ 2 ]  Projetos            → Veja o que eu já desenvolvi <br>
        [ 3 ]  Links e contatos    → Entre em contato comigo <br>
        [ 4 ]  Habilidades e CV    → Confira minhas competências e currículo <br>
        [ 5 ]  Comandos            → Confira os comandos usados <br>
        <br>
        Digite o número da opção desejada: <br><br>`;

  } else if (qual === 2) {
    t = `<br>[1] binaryGame.txt  [2] theLastFall.txt [3] cuboMagico.txt [4] Voltar <br><br> 
         Selecione um projeto, ou use: nano -file.name- para ver sua descrição.<br><br>`;
  } else if (qual === 3) {
    t = `<br>Obrigado por entrar em contato comigo :)<br><br>
        [ 1 ] whatsApp <br>
        [ 2 ] email <br>
        [ 3 ] gitHub <br>
        [ 4 ] linkedin <br>
        [ 5 ] Voltar <br><br>
        Digite o número da opção desejada:<br><br>`;
  } else if (qual === 4) {
    t = `<br>[1] curriculo.pdf [2] habilidades.pdf [3] Voltar <br><br>
         Selecione um arquivo, ou use: view -file.name-<br><br>`;
  } else if (qual === 5) {
    t = `<br># ---- comandos ----#<br><br>
          ls, cd -dir-, pwd, nano -file.txt-, view -file.pdf- <br><br>
          # ---- Árvore de diretórios ----#<br><br>
          /portfolio<br>
          ├── sobre-mim.txt<br>
          ├── projetos/<br>
          │    ├── theLastFall.txt<br>
          │    ├── binaryGame.txt<br>
          │    └── cuboMagico.txt<br>
          │   <br>
          ├── contatos/<br>
          │    ├── email.url<br>
          │    ├── linkedin.url<br>
          │    ├── whatsapp.url<br>
          │    └── github.url<br>
          │    <br>
          └── habilidades/<br>
               ├── habilidades.pdf<br>
               └── curriculo.pdf<br><br>`;
  }
  return t;
}

function getProjectText(which) {
  let t;
  if (which === 1) {
    t = document.getElementById("theLastFall-txt").innerText;
  } else if (which === 2) {
    t = document.getElementById("cuboMagico-txt").innerText;
  } else {
    t = document.getElementById("binaryGame-txt").innerText;
  }
  return t;
}


fakeInput.addEventListener("input", () => {
  const texto = fakeInput.innerText;
  const primeiraPalavra = texto.split(" ")[0] || "";
  const resto = texto.substring(primeiraPalavra.length);
  fakeInput.innerHTML = `<span style="color: orange">${primeiraPalavra}</span>${resto}`;
  

  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(fakeInput);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
});

fakeInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const cmdLine = fakeInput.innerText.trim().split(" ");
    const cmd = cmdLine[0];
    const file = cmdLine[1];
    fakeInput.innerText = "";

    const primeiraPalavra = `<span style="color: orange">${cmd}</span>`;
    const resto = cmdLine.slice(1).join(" ");
    const ter = `<span class="terminalIdentifier" contenteditable="false">${terminalIdentifier}</span>`;
    adicionarLinhaTerminal(`${ter} ${primeiraPalavra} ${resto}`);
    terminalId();

    cmds( cmd, file);
  }
});


function cmds(cmd, file) {

  if (cmd === "pwd" || (actualPathTerminal === pathTerminal[0] && cmd === "5")) {
    printTerminalOutput(pathText(5), "#00ff88");
  }

  else if (cmd === "nano") {
    if (actualPathTerminal === pathTerminal[0] && file === "sobreMim.txt") {
      printTerminalOutput("Abrindo arquivo sobreMim.txt...", "#aaa");
      openTextReader("sobreMim");
    }

    else if (actualPathTerminal === pathTerminal[1]) {
      if (file === "whatsapp.url" || file === "whatsapp" || file === "whatsapp.txt") {
        linkMove("zapLink");
      } else if (file === "linkedin.url" || file === "linkedin" || file === "linkedin.txt") {
        linkMove("linkedinLink");
      } else if (file === "email.url" || file === "email" || file === "email.txt") {
        linkMove("emailLink");
      } else if (file === "gitHub.url" || file === "gitHub" || file === "gitHub.txt") {
        linkMove("gitLink");
      } else {
        printTerminalOutput("Nenhum arquivo com o nome " + file, "red");
      }
    }

    else if (actualPathTerminal === pathTerminal[3]) {
      if (file === "theLastFall.txt") {
        printTerminalOutput("Abrindo arquivo theLastFall.txt...", "#aaa");
        openTextReader("theLastFall");
      } else if (file === "cuboMagico.txt") {
        printTerminalOutput("Abrindo arquivo cuboMagico.txt...", "#aaa");
        openTextReader("cuboMagico");
      } else if (file === "binaryGame.txt") {
        printTerminalOutput("Abrindo arquivo binaryGame.txt...", "#aaa");
        openTextReader("binaryGame");
      } else {
        printTerminalOutput("Nenhum arquivo com o nome " + file, "red");
      }
    }

    else {
      printTerminalOutput("Nenhum arquivo com o nome " + file, "red");
    }
  }

  else if (cmd === "view") {
    if (actualPathTerminal === pathTerminal[2]) {
      if (file === "habilidades.pdf") {
        printTerminalOutput("Abrindo habilidades.pdf...", "#aaa");
        openPdfReader("habilidades");
      } else if (file === "curriculo.pdf") {
        printTerminalOutput("Abrindo curriculo.pdf...", "#aaa");
        openPdfReader("curriculo");
      } else {
        printTerminalOutput("Arquivo não encontrado: " + file, "red");
      }
    } else {
      printTerminalOutput("Arquivo não encontrado: " + file, "red");
    }
  }

  else if (cmd === "ls") {
    if (actualPathTerminal === pathTerminal[0]) {
      printTerminalOutput("sobreMim.txt  /projetos  /contatos  /habilidades", "#5294E2");
    } else if (actualPathTerminal === pathTerminal[1]) {
      printTerminalOutput(pathText(3), "#5294E2");
    } else if (actualPathTerminal === pathTerminal[2]) {
      printTerminalOutput(pathText(4), "#5294E2");
    } else if (actualPathTerminal === pathTerminal[3]) {
      printTerminalOutput(pathText(2), "#5294E2");
    }
  }

  else if (cmd === "cd") {
    if (!file.includes("/portifolio")) file = "/portifolio" + file;

    if (file === actualPathTerminal) {
      printTerminalOutput("Você se encontra neste diretório", "#00ff88");
    } else if (file === "/portifolio/projetos") {
      changePathTerminal(3);
      printTerminalOutput("Diretório alterado para " + file, "#00ff88");
    } else if (file === "/portifolio/habilidades") {
      changePathTerminal(2);
      printTerminalOutput("Diretório alterado para " + file, "#00ff88");
    } else if (file === "/portifolio/contatos") {
      changePathTerminal(1);
      printTerminalOutput("Diretório alterado para " + file, "#00ff88");
    } else if (file === "/portifolio") {
      changePathTerminal(0);
      printTerminalOutput("Diretório alterado para " + file, "#00ff88");
    } else {
      printTerminalOutput("Diretório não encontrado: " + file, "red");
    }
  }

  else if (actualPathTerminal === pathTerminal[0]) {
    if (cmd === "1") {
      printTerminalOutput("Abrindo arquivo sobreMim.txt...", "#aaa");
      openTextReader("sobreMim");
    } else if (cmd === "2") {
      changePathTerminal(3);
      printTerminalOutput("Diretório alterado para " + pathTerminal[3], "#00ff88");
      printTerminalOutput(pathText(2), "#5294E2");
    } else if (cmd === "3") {
      changePathTerminal(1);
      printTerminalOutput("Diretório alterado para " + pathTerminal[1], "#00ff88");
      printTerminalOutput(pathText(3), "#5294E2");
    } else if (cmd === "4") {
      changePathTerminal(2);
      printTerminalOutput("Diretório alterado para " + pathTerminal[2], "#00ff88");
      printTerminalOutput(pathText(4), "#5294E2");
    } else {
      printTerminalOutput(`${cmd}: comando não encontrado`, "red");
    }
  }

  else if (actualPathTerminal === pathTerminal[1]) {
    if (cmd === "1") {
      linkMove("zapLink");
    } else if (cmd === "2") {
      linkMove("emailLink");
    } else if (cmd === "3") {
      linkMove("gitLink");
    } else if (cmd === "4") {
      linkMove("linkedinLink");
    } else if (cmd === "5") {
      printTerminalOutput("Diretório alterado para " + pathTerminal[0], "#00ff88");
      changePathTerminal(0);
    } else {
      printTerminalOutput(`${cmd}: comando não encontrado`, "red");
    }
  }

  else if (actualPathTerminal === pathTerminal[2]) {
    if (cmd === "1") {
      printTerminalOutput("Abrindo habilidades.pdf...", "#aaa");
      openPdfReader("curriculo");
    } else if (cmd === "2") {
      printTerminalOutput("Abrindo curriculo.pdf...", "#aaa");
      openPdfReader("habilidades");
    } else if(cmd = "3"){
      printTerminalOutput("Diretório alterado para " + pathTerminal[0], "#00ff88");
      changePathTerminal(0);
    }else {
      printTerminalOutput(`${cmd}: comando não encontrado`, "red");
    }
  }

  else if (actualPathTerminal === pathTerminal[3]) {
    if (cmd === "1") {
      printTerminalOutput("Abrindo arquivo binaryGame.txt...", "#aaa");
      openTextReader("binaryGame");
    } else if (cmd === "2") {
      printTerminalOutput("Abrindo arquivo theLastFall.txt...", "#aaa");
      openTextReader("theLastFall");
    } else if (cmd === "3") {
      printTerminalOutput("Abrindo arquivo cuboMagico.txt...", "#aaa");
      openTextReader("cuboMagico");
    } else if(cmd==="4"){
      printTerminalOutput("Diretório alterado para " + pathTerminal[0], "#00ff88");
      changePathTerminal(0);
    }else {
     printTerminalOutput(`${cmd}: comando não encontrado`, "red");
    }
  }

  else {
    printTerminalOutput(`${cmd}: comando não encontrado`, "red");
  }
}

function changePathTerminal(index) {
  if(index === 0){
    printTerminalOutput(`<span class="terminalIdentifier" contenteditable="false"></span> <br><br>${pathText(1)}`)
  }
  actualPathTerminal = pathTerminal[index];
  terminalIdentifier = "PedroS@-desktop:~" + actualPathTerminal + ":";
  
  console.log(actualPathTerminal)
  terminalId();
}

let portExe = document.querySelectorAll(".port_exe")
portExe.forEach(e => {
  e.ondblclick = () => docCk.click();
});


//todo -> Media

