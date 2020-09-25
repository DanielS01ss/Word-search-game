(function main(){
  const audio = new Audio("Audio/wrong-answer.mp3");
  const context = document.querySelector("canvas").getContext("2d");
  const mainBtn = document.querySelector("#activate-full");
  const playBtn = document.querySelector(".play-btn");
  const elem = document.querySelector("body");
  const canvas = document.querySelector("canvas");
  const firstScreen = document.querySelector(".display-before");
  const wordCounter = document.querySelector(".word-num");
  const wordCounterContainer = document.querySelector(".word-num-container");
  const congratulations = document.querySelector(".congratulations");
  const confettiContainer = document.querySelector(".container");
  ///aici avem functia folosita pentru a renderui elementele pe pagina
  let rectWidth;
  let rectHeight;
  let gameArr = [
    [ "L", "D", "N", "K", "H", "W", "J", "M", "H" ],
    [  "O", "T", "I", "M", "O","T" , "E", "I", "I"],
    ["I","B","G","X","B","Q","Q","C","W"],
    ["S","D","I","S","U","S","V","F","Q"],
    ["Y","J","D","C","P","F","H","K","S"],
    ["U","D","N","S","O","A","K","H","I"],
    ["G","M","D","Z","R","M","V","S","B"],
    ["T","I","M","O","T","E","U","E","D"],
    ["I","S","U","S","T","E","I","C","L"]

];
let gameColors = ["rgba(255, 255, 0, 0.5)","rgba(255,0,0,0.5)","rgba(0, 204, 0,0.5)","rgba(0, 51, 204,0.5)","rgba(204, 0, 153,0.5)","rgb(255, 102, 0,0.5)"];
let squareLetter = [];
let wordsToBeFound = ["timotei","lois","pavel","isus","har"];
const buffer = [];

let foundedWords = 0;
const wordsCount = wordsToBeFound.length;

///Functia asta este folosita pentru a putea itera printre elementele
/// care sunt in buffer si a le redesena
function redrawLines(){
  if(buffer.length>0){
    let myLineWidth;
     for(let j=0;j<buffer.length;j+=2){
               if(document.documentElement.clientWidth<500){
                 myLineWidth = (35/500)*canvas.width;
               }
               else{
                 myLineWidth = 35;

               }

              if(buffer[j].obj.i === buffer[j+1].obj.i){
                if(document.documentElement.clientWidth>500)
                {
                  context.beginPath();
                  context.moveTo(buffer[j].obj.firstX+rectWidth/3,buffer[j].obj.firstY+(rectWidth/2.5));
                  context.lineTo(buffer[j+1].obj.finalX-rectWidth/2.8,buffer[j+1].obj.finalY-(rectWidth/1.6));
                  context.lineWidth = myLineWidth;
                  context.strokeStyle = buffer[j].color;
                  context.lineCap = "round";
                  context.stroke();

                }

            else if(document.documentElement.clientWidth<=500){
                  context.beginPath();
                  context.moveTo(buffer[j].obj.firstX+rectWidth/2.5,buffer[j].obj.firstY+rectWidth/2.5);
                  context.lineTo(buffer[j+1].obj.finalX-rectWidth/2,buffer[j+1].obj.finalY-rectWidth/1.6);
                  context.lineWidth = myLineWidth;
                  context.strokeStyle = buffer[j].color;
                  context.lineCap = "round";
                  context.stroke();
                }
              }
              else if(buffer[j].obj.j === buffer[j].obj.j){
                if(document.documentElement.clientWidth<=300)
                {
                  context.beginPath();
                  context.moveTo(buffer[j].obj.firstX+(rectWidth-5)/2,buffer[j].obj.firstY+15);
                  context.lineTo(buffer[j+1].obj.finalX-(rectWidth+5)/2,buffer[j+1].obj.finalY-15);
                  context.lineWidth = myLineWidth;
                  context.strokeStyle = buffer[j].color;
                  context.lineCap = "round";
                  context.stroke();

                }
                else{
                  context.beginPath();
                  context.moveTo(buffer[j].obj.firstX+(rectWidth-12)/2,buffer[j].obj.firstY+15);
                  context.lineTo(buffer[j+1].obj.finalX-(rectWidth+10)/2,buffer[j+1].obj.finalY-15);
                  context.lineWidth = myLineWidth;
                  context.strokeStyle = buffer[j].color;
                  context.lineCap = "round";
                  context.stroke();

                }
              }
              else if(buffer[j].obj.i+buffer[j].obj.j === buffer[j+1].obj.i+buffer[j+1].obj.j){

                if(document.documentElement.clientWidth<300 )
                {

                  context.beginPath();
                  context.moveTo(buffer[j].obj.firstX+rectWidth/2.3,buffer[j].obj.firstY+rectWidth/2);
                  context.lineTo(buffer[j+1].obj.finalX-rectWidth/1.5,buffer[j+1].obj.finalY-rectWidth/2);
                  context.lineWidth = myLineWidth;
                  context.strokeStyle = buffer[j].color;
                  context.lineCap = "round";
                  context.stroke();

                }

                else if(document.documentElement.clientWidth>500)
                {
                  context.beginPath();
                  context.moveTo(buffer[j].obj.firstX+rectWidth/2.3,buffer[j].obj.firstY+rectWidth/2);
                  context.lineTo(buffer[j+1].obj.finalX-rectWidth/1.5,buffer[j+1].obj.finalY-rectWidth/2);
                  context.lineWidth = myLineWidth;
                  context.strokeStyle = buffer[j].color;
                  context.lineCap = "round";
                  context.stroke();


                }
                else if(document.documentElement.clientWidth<=385)
                {
                  context.beginPath();
                  context.moveTo(buffer[j].obj.firstX+rectWidth/1.9,buffer[j].obj.firstY+rectWidth/3);
                  context.lineTo(buffer[j+1].finalX-rectWidth/1.9,buffer[j+1].finalY-rectWidth/1.7);
                  context.lineWidth = myLineWidth;
                  context.strokeStyle = buffer[j].color;
                  context.lineCap = "round";
                  context.stroke();

                }
                else {
                  context.beginPath();
                  context.moveTo(buffer[j].obj.firstX+rectWidth/2,buffer[j].obj.firstY+rectWidth/3);
                  context.lineTo(buffer[j+1].obj.finalX-rectWidth/1.4,buffer[j+1].obj.finalY-rectWidth/2);
                  context.lineWidth = myLineWidth;
                  context.strokeStyle = buffer[j].color;
                  context.lineCap = "round";
                  context.stroke();

                }
              }
              else if(Math.abs(buffer[j].obj.i-buffer[j].obj.j) === Math.abs(buffer[j+1].obj.i-buffer[j].obj.j)){
                context.beginPath();
                context.moveTo(buffer[j].obj.firstX+rectWidth/2.3,buffer[j].obj.firstY+rectWidth/2.5);
                context.lineTo(buffer[j+1].obj.finalX-15,buffer[j+1].obj.finalY-15);
                context.lineWidth = myLineWidth;
                context.strokeStyle = obj[j].color;
                context.lineCap = "round";
                context.stroke();

              }





     }
  }
}

  const render = function(){

    let dimession = "";
    let marginText="margin-top:0px";
    canvas.removeAttribute("style");
    if(document.documentElement.clientWidth>=500)
    {
      marginText="margin-top:40px";
      context.canvas.width = 500;
      context.canvas.height = 500;
      canvas.setAttribute("style",marginText);
    }
    else{
      context.canvas.width = document.documentElement.clientWidth-14;
      context.canvas.height = document.documentElement.clientWidth-14;
      canvas.setAttribute("style",marginText);
    }
    context.fillStyle = "#fff";
    context.fillRect(0,0,context.canvas.width,context.canvas.height);
    wordCounter.textContent = `${foundedWords}/${wordsCount}`;
  };


function updateWords(){

      wordCounter.textContent = `${foundedWords}/${wordsCount}`;
}

if(document.documentElement.clientWidth<508)
{
    context.canvas.height = document.documentElement.clientWidth-3;
}


  function handleClick(){
    if (elem.requestFullscreen) {
     elem.requestFullscreen();
   } else if (elem.mozRequestFullScreen) { /* Firefox */
     elem.mozRequestFullScreen();
   } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
     elem.webkitRequestFullscreen();
   } else if (elem.msRequestFullscreen) { /* IE/Edge */
     elem.msRequestFullscreen();
   }
    render();
  }

  //aici am definit functia pe baza careia aflam
  /// cati pixeli scadem din spatii
  function returnRes(){
   let res = 500-document.documentElement.clientWidth;
   return Math.floor((res/20));

  }

  let xRect=20;
  let yRect=7;
  let initialX;
  let initialY;
  let letterX ;
  let letterY ;
  let spaceX;
  let spaceY;

  ///aici desenam ce avem de desenat
  function draw(){
    squareLetter = [];
   context.beginPath();
   context.strokeStyle="#000";
   context.fillStyle = "#000";

  spaceX = 30;
  spaceY = 40;
  if(document.documentElement.clientWidth>=500){
    context.font = "13pt sans-serif";
      initialX = 15;
      initialY = 25;
      spaceX = 55;
      spaceY = 55.9;
  }
  else{
    let ratio = 20/500;
    let myFontSize = document.documentElement.clientWidth*ratio;
    context.font = `${myFontSize}px sans-serif`;
    initialX = (10/500)*canvas.width;
    initialY = (29/500)*canvas.height;
    spaceX = (56/500)*canvas.width;
    spaceY = (55.9/500)*canvas.height;
  }

  //
  // if(document.documentElement.clientWidth<=350)
  // {
  //   context.font = "10pt sans-serif";
  //   initialX=10;
  //   initialY = 18;
  //   spaceX = 54-returnRes()*2.2;
  //   spaceY = 54-returnRes()*2.2;
  // }
  // else if(document.documentElement.clientWidth>=500){
  //     context.font = "13pt sans-serif";
  //     initialX = 15;
  //     initialY = 29;
  //     spaceX = 56;
  //     spaceY = 55.9;
  //   }
  //   else{
  //       context.font = "13pt sans-serif";
  //       initialX=10;
  //       initialY = 30;
  //       spaceX = 54-returnRes()*2.5;
  //       spaceY = 54-returnRes()*2.5;
  //
  //   }

  letterX = initialX;
  letterY = initialY;


let currentElem = 0;

  for(let j=0;j<9;j++)
  {

   for(let i = 0;i<9;i++)
   {


     context.fillText(gameArr[j][i],letterX,letterY);
     letterX+=spaceX;
     currentElem++;

   }
   letterX = initialX;
   letterY+=spaceY;
  }

///desenam patratele aicea
 rectWidth = canvas.width/9;
 rectHeight = canvas.height/9;

 letterX = 0;
 letterY = 0;
 currentElem = 0;
 context.fillStyle = "rgba(0,0,0,0.9)";
 ///desenam patrate
 for(let j=0;j<9;j++)
 {

  for(let i = 0;i<9;i++)
  {
    let myObj ={
      firstX:letterX,
      firstY:letterY,
      finalX:letterX+rectWidth,
      finalY:letterY+rectHeight,
      letter:gameArr[i][j],
      i:j,
      j:i
    }
    squareLetter.push(myObj);
     // context.fillRect(letterX,letterY,rectWidth,rectHeight);
    letterX+=rectWidth;

    }
  letterX = 0;
  letterY+=rectHeight;
 }

}

  /*
    HERE'S OUR GAME LOGIC
  */
  /*
    Jocul va functiona asa:
      cand jucatorul apasa pe primul patrat inregistram litera si tot patratul
      el va desena o linie pana pe patratul respectiv si anume cel de-al doliea.
      La mouseDown sau touchdown ce se intampla este ca inregistram ultimul patrat
  */

///aceste variabile le folosim pentru a stoca
  let startSquare=null,endSquare=null;
  var data = 0;

  let chosenColor = null;
  function gameLogic(evt){
    /*
      Pe diagonala secundara suma lui i si j este aceaisi
      Asa ca pentru a verifica corectitudinea jocului vom proceda asa:
        verificam daca cele doua patrate selectate de user au acelasi i
        sau acelasi j (sunt pe acelasi linie sau pe aceiasi coloana)
        daca nu sunt pe aceiasi linie sau aceiasi coloana atunci verificam diagonalele si acolo avem asa:

          -> daca doua elemente sunt pe aceiasi coloana atunci:
            SUMA LUI I SI J sau DIFERENTA ABSOLUTA DINTRE I SI J e aceiasi

    */


      let mouseX = evt.clientX-canvas.getBoundingClientRect().left;
      let mouseY = evt.clientY-canvas.getBoundingClientRect().top;
      var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));

      data++;

      if(isTouch)
      {

        var rect = canvas.getBoundingClientRect();
        // if(data === 2)
        // {
        //
        //             mouseX = evt.targetTouches[0].pageX - rect.left;
        //             mouseY = evt.targetTouches[0].pageY - rect.top;
        //
        //
        //   data = 0;
        //   // console.log(evt);
        //   // console.log("Prima data");
        //
        // }
        // else{
        //
        //   mouseX = evt.changedTouches[evt.changedTouches.length-1].pageX - rect.left;
        //   mouseY = evt.changedTouches[even.changedTouches.length-1].pageY - rect.top;
        //
        // }
        if(evt.type === "touchstart")
        {
          mouseX = evt.targetTouches[0].pageX-rect.left;
          mouseY = evt.targetTouches[0].pageY-rect.top;
        }
        else if(evt.type === "touchend")
        {
          mouseX = evt.changedTouches[0].pageX - rect.left;
          mouseY = evt.changedTouches[0].pageY - rect.top;
        }


      }

      context.fillStyle="red";

      function win(){
        setTimeout(function(){
            canvas.classList.add("no-display");
            wordCounterContainer.classList.add("no-display");
            congratulations.classList.remove("no-display");
            confettiContainer.classList.remove("no-display");
            document.body.setAttribute("style","overflow-x:hidden; overflow-y:hidden");
        },500);


      }


      for(const elem of squareLetter){
        if(mouseX>elem.firstX && mouseX<elem.finalX && mouseY>elem.firstY && mouseY<elem.finalY)
        {

          if(startSquare===null)
          {
            ///asta inseamna ca am dat doar startul
            startSquare = elem;

          }
          else{

            ///aici vine logica din spate la tot
            if(chosenColor === null)
            {
              chosenColor = gameColors[Math.floor(Math.random()*gameColors.length)];
              gameColors.splice(gameColors.indexOf(chosenColor),1);
            }

            endSquare = elem;

            if(endSquare.i===startSquare.i && endSquare.j === startSquare.j)
            {
              endSquare = null;
              startSquare = null;
            }

            else{
              ///implementarea de verificare

              let aux;

              let myLineWidth;
              ///aici ne vom ocupa de grosimea linii in functie de dimensiunea ecranului
              // if(document.documentElement.clientWidth<=300)
              // {
              //   myLineWidth = 20;
              // }
              // else if(document.documentElement.clientWidth<400)
              // {
              //   myLineWidth = 30;
              // }
              // else if(document.documentElement.clientWidth<500)
              // {
              //   myLineWidth =30;
              //
              // }
              if(document.documentElement.clientWidth<500){
                myLineWidth = (35/500)*canvas.width;
              }
              else{
                myLineWidth = 35;

              }
                // console.log("start Square");
                // console.log(startSquare);
                // console.log("end Square");
                // console.log(endSquare);
                // console.log("-------------------");



              if(startSquare.i === endSquare.i)
              {
                if(startSquare.firstX>=endSquare.finalX)
                {
                  aux = endSquare;
                  endSquare = startSquare;
                  startSquare = aux;

                }

                ///acuma iteram sa vedem daca am gasit cuvantul
                let tempArr = [];
                for(let k=startSquare.j;k<=endSquare.j;k++)
                {
                  tempArr.push(gameArr[startSquare.i][k]);
                }
                let resString = tempArr.join("");
                resString = resString.toLowerCase();
                if(wordsToBeFound.indexOf(resString)!=-1)
                {
                  foundedWords++;
                  updateWords();
                  if(document.documentElement.clientWidth>500)
                  {
                    context.beginPath();
                    context.moveTo(startSquare.firstX+rectWidth/3,startSquare.firstY+(rectWidth/2.5));
                    context.lineTo(endSquare.finalX-rectWidth/2.8,endSquare.finalY-(rectWidth/1.6));
                    context.lineWidth = myLineWidth;
                    context.strokeStyle = chosenColor;
                    context.lineCap = "round";
                    context.stroke();
                    buffer.push({obj:startSquare,color:chosenColor},{obj:endSquare,color:chosenColor});
                  }

              else if(document.documentElement.clientWidth<=500){
                    context.beginPath();
                    context.moveTo(startSquare.firstX+rectWidth/2.5,startSquare.firstY+rectWidth/2.5);
                    context.lineTo(endSquare.finalX-rectWidth/2,endSquare.finalY-rectWidth/1.6);
                    context.lineWidth = myLineWidth;
                    context.strokeStyle = chosenColor;
                    context.lineCap = "round";
                    context.stroke();
                    buffer.push({obj:startSquare,color:chosenColor},{obj:endSquare,color:chosenColor});

                  }

                  wordsToBeFound.splice(wordsToBeFound.indexOf(resString),1);
                  canvas.classList.add("correct-answer");
                  setTimeout(function(){
                    canvas.classList.remove("correct-answer");
                  },400);

                  if(wordsCount === foundedWords)
                  {
                    win();
                  }

                  chosenColor = null;
                }
                else{
                  canvas.classList.add("canvas-shadow");
                  setTimeout(function(){
                    canvas.classList.remove("canvas-shadow");
                  },400);
                  audio.play();
                }




              }
              else if(startSquare.j === endSquare.j)
              {


                if(startSquare.firstY>=endSquare.finalY)
                {
                  aux = endSquare;
                  endSquare = startSquare;
                  startSquare = aux;

                }

                let tempArr = [];
                for(let k=startSquare.i;k<=endSquare.i;k++)
                {
                  tempArr.push(gameArr[k][startSquare.j]);
                }
                let resString = tempArr.join("");
                resString = resString.toLowerCase();
                if(wordsToBeFound.indexOf(resString)!=-1)
                {
                  foundedWords++;
                  updateWords();
                  if(document.documentElement.clientWidth<=300)
                  {
                    context.beginPath();
                    context.moveTo(startSquare.firstX+(rectWidth-5)/2,startSquare.firstY+15);
                    context.lineTo(endSquare.finalX-(rectWidth+5)/2,endSquare.finalY-15);
                    context.lineWidth = myLineWidth;
                    context.strokeStyle = chosenColor;
                    context.lineCap = "round";
                    context.stroke();
                    buffer.push({obj:startSquare,color:chosenColor},{obj:endSquare,color:chosenColor});
                  }
                  else{
                    context.beginPath();
                    context.moveTo(startSquare.firstX+(rectWidth-12)/2,startSquare.firstY+15);
                    context.lineTo(endSquare.finalX-(rectWidth+10)/2,endSquare.finalY-15);
                    context.lineWidth = myLineWidth;
                    context.strokeStyle = chosenColor;
                    context.lineCap = "round";
                    context.stroke();
                    buffer.push({obj:startSquare,color:chosenColor},{obj:endSquare,color:chosenColor});
                  }

                  wordsToBeFound.splice(wordsToBeFound.indexOf(resString),1);
                  canvas.classList.add("correct-answer");
                  setTimeout(function(){
                    canvas.classList.remove("correct-answer");
                  },400);

                  if(wordsCount === foundedWords)
                  {
                    win();
                  }

                  chosenColor = null;
                }
                else{
                  canvas.classList.add("canvas-shadow");
                  setTimeout(function(){
                    canvas.classList.remove("canvas-shadow");
                  },400);
                  audio.play();
                }



              }
              else if(startSquare.i+startSquare.j === endSquare.i+endSquare.j)
              {

                if(startSquare.firstY>=endSquare.finalY)
                {
                  aux = endSquare;
                  endSquare = startSquare;
                  startSquare = aux;
                }


              ////implementare verificare

              let tempArr = [];
              let j,k;
            let  t = startSquare.i;
            let  z = startSquare.j;
              while(t<=endSquare.i )
              {
                tempArr.push(gameArr[t][z]);
                t++;
                z--;
              }

              let reverseString = tempArr.reverse();
              reverseString = reverseString.join("");
              reverseString = reverseString.toLowerCase();
              tempArr.reverse();
              let resString = tempArr.join("");
              resString = resString.toLowerCase();

              if(wordsToBeFound.indexOf(resString)!=-1  || wordsToBeFound.indexOf(reverseString)!=-1)
              {
                foundedWords++;
                updateWords();
                if(document.documentElement.clientWidth<300 )
                {

                  context.beginPath();
                  context.moveTo(startSquare.firstX+rectWidth/2.3,startSquare.firstY+rectWidth/2);
                  context.lineTo(endSquare.finalX-rectWidth/1.5,endSquare.finalY-rectWidth/2);
                  context.lineWidth = myLineWidth;
                  context.strokeStyle = chosenColor;
                  context.lineCap = "round";
                  context.stroke();
                  buffer.push({obj:startSquare,color:chosenColor},{obj:endSquare,color:chosenColor});
                }

                else if(document.documentElement.clientWidth>500)
                {
                  context.beginPath();
                  context.moveTo(startSquare.firstX+rectWidth/2.3,startSquare.firstY+rectWidth/2);
                  context.lineTo(endSquare.finalX-rectWidth/1.5,endSquare.finalY-rectWidth/2);
                  context.lineWidth = myLineWidth;
                  context.strokeStyle = chosenColor;
                  context.lineCap = "round";
                  context.stroke();
                  buffer.push({obj:startSquare,color:chosenColor},{obj:endSquare,color:chosenColor});

                }
                else if(document.documentElement.clientWidth<=385)
                {
                  context.beginPath();
                  context.moveTo(startSquare.firstX+rectWidth/1.9,startSquare.firstY+rectWidth/3);
                  context.lineTo(endSquare.finalX-rectWidth/1.9,endSquare.finalY-rectWidth/1.7);
                  context.lineWidth = myLineWidth;
                  context.strokeStyle = chosenColor;
                  context.lineCap = "round";
                  context.stroke();
                  buffer.push({obj:startSquare,color:chosenColor},{obj:endSquare,color:chosenColor});
                }
                else {
                  context.beginPath();
                  context.moveTo(startSquare.firstX+rectWidth/2,startSquare.firstY+rectWidth/3);
                  context.lineTo(endSquare.finalX-rectWidth/1.4,endSquare.finalY-rectWidth/2);
                  context.lineWidth = myLineWidth;
                  context.strokeStyle = chosenColor;
                  context.lineCap = "round";
                  context.stroke();
                  buffer.push({obj:startSquare,color:chosenColor},{obj:endSquare,color:chosenColor});
                }

                wordsToBeFound.splice(wordsToBeFound.indexOf(resString),1);
                canvas.classList.add("correct-answer");
                setTimeout(function(){
                  canvas.classList.remove("correct-answer");
                },400);
                if(wordsCount === foundedWords)
                {
                  win();
                }
                chosenColor = null;
              }
              else{
                canvas.classList.add("canvas-shadow");
                setTimeout(function(){
                  canvas.classList.remove("canvas-shadow");
                },400);
                audio.play();
              }

              }
              else if(Math.abs(startSquare.i-startSquare.j) === Math.abs(endSquare.i-endSquare.j))
              {

                if(startSquare.firstY>=endSquare.finalY)
                {
                  aux = endSquare;
                  endSquare = startSquare;
                  startSquare = aux;
                }

                ///aici avem implementarea de verificare pentru fieacare cuvant
                ////implementare verificare
                let tempArr = [];
                let j,k;
              let  t = startSquare.i;
              let  z = startSquare.j;
                while(t<=endSquare.i && z<=endSquare.j)
                {
                  tempArr.push(gameArr[t][z]);
                  t++;
                  z++;
                }
                let resString = tempArr.join("");
                resString = resString.toLowerCase();
                if(wordsToBeFound.indexOf(resString)!=-1)
                {
                  foundedWords++;
                  updateWords();
                  context.beginPath();
                  context.moveTo(startSquare.firstX+rectWidth/2.3,startSquare.firstY+rectWidth/2.5);
                  context.lineTo(endSquare.finalX-15,endSquare.finalY-15);
                  context.lineWidth = myLineWidth;
                  context.strokeStyle = chosenColor;
                  context.lineCap = "round";
                  context.stroke();
                  buffer.push({obj:startSquare,color:chosenColor},{obj:endSquare,color:chosenColor});
                  wordsToBeFound.splice(wordsToBeFound.indexOf(resString),1);
                  canvas.classList.add("correct-answer");
                  setTimeout(function(){
                    canvas.classList.remove("correct-answer");
                  },400)
                  chosenColor = null;
                  if(wordsCount === foundedWords)
                  {
                    win();
                  }

                }
                else{
                  canvas.classList.add("canvas-shadow");
                  setTimeout(function(){
                    canvas.classList.remove("canvas-shadow");
                  },200);
                  audio.play();
                }

              }
              else{
                audio.play();
              }

              startSquare = null;
              endSquare = null;
            }
         }
      }
    }
   }
   ///aceasta functie itereaza matricea si verifica daca
   /// cuvantul se gaseste in lista si returneaza 1 sau 0
   /// daca se gaseste il scoatem din lista de cuvinte
   /// care sunt cautate



  /*
      PRIMELE "D"OUA COMENTURI DIN FUNCTIE DECOMENTEAZA-LE CAND TERMINI
  */

  function startGame(){
    firstScreen.classList.add("no-display");
    canvas.classList.remove("no-display");
    wordCounterContainer.classList.remove("no-display");
    render();
    setTimeout(function(){
      draw();

    },100)
  }

  function handleResize(){
    render();
    redrawLines();
    setTimeout(function(){
      draw();

    },100)

  }

  render();
  window.addEventListener("resize",handleResize);
  playBtn.addEventListener("click",startGame);
  canvas.addEventListener("mousedown",gameLogic);
  canvas.addEventListener("mouseup",gameLogic);

  canvas.addEventListener("touchstart",gameLogic,{passive:true});
  canvas.addEventListener("touchend",gameLogic,{passive:true});


})();
