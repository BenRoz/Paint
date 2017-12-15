var colors=["yellow","red","orange","blue", "purple", "green"];
var currentColor = "white";

function createPaint(){
    var first=document.createElement('div');
    first.id="main";
    first.style=" align-items:center; "
    document.body.appendChild(first);
    createpallet();
    createColorPallet();
    eraser();
    createSquars();


}
createPaint();

function createpallet(){
    var pallet= document.createElement('div');
    pallet.id = "colorPallet";
    pallet.style="height:50px; width:500px; border:1px solid black; display:flex; justify-content:space-between ";
    document.getElementById("main").appendChild(pallet);
}

function  createColorPallet(){
    for (var i=0 ; i<colors.length; i++){
        var palletSquare = document.createElement('div');
        palletSquare.className = "color";
        palletSquare.style= "background:"+colors[i]+"; width:60px;  ";
        document.getElementById("colorPallet").appendChild(palletSquare);
        palletSquare.addEventListener("click", pickColor);
    }
}

function eraser(){
    var erase= document.createElement('button');
     document.getElementById("colorPallet").appendChild(erase);
    erase.id="button";
    erase.style="width:50px; " ;
    erase.addEventListener("click", white);

}
function white(){
    currentColor = "white";
}

function pickColor(){
    currentColor = this.style.backgroundColor;
}
function hover(){
    this.style.height = "300px";
}

function createSquars(){
    var mainSquare= document.createElement('div');
    mainSquare.id="mainSquare"
    mainSquare.style="line-height:0px; display:inline-block; height:500px; width:500px; border:1px solid black; " ;
    document.getElementById("main").appendChild(mainSquare);
    for (var i =0; i<50; i++){
        for (var j=0; j<50; j++){
            var square= document.createElement('div');
            square.className= "square";
            square.y= i;
            square.x= j;
            document.getElementById("mainSquare").appendChild(square);
            square.style= "height:10px; width:10px;  display:inline-block;" ;
            square.addEventListener("mousedown", start);
            square.addEventListener("mouseover", paintSquare);
            square.addEventListener("mouseup", stop);
        }
    }
}
var enable = false;

function start(){
    enable=true;
}
function paintSquare(e){
    if(enable){
        this.style.backgroundColor = currentColor;
    }
}
function stop(){
    enable=false;
}

 var saveDiv= document.createElement('div');
     saveDiv.id = "SaveDiv";
     document.getElementById("main").appendChild(saveDiv);
     saveDiv.style="height:300px; width:80px; display:inline-block; position:absolute;  ";

var saveBut = document.createElement('button');
    saveBut.id = "saveButton";
    saveBut.style="width:80px; height:40px; margin:5px 5px; " ;
    document.getElementById("SaveDiv").appendChild(saveBut);
    document.getElementById("saveButton").innerHTML="save" ;
    saveBut.addEventListener("click", saveGrid);

var loadBut = document.createElement('button');
    loadBut.id = "loadButton";
    loadBut.style="width:80px; height:40px; margin:5px 5px; " ;
    document.getElementById("SaveDiv").appendChild(loadBut);
    document.getElementById("loadButton").innerHTML="load" ;
    loadBut.addEventListener("click", loadGrid);

var reset = document.createElement('button');
    reset.id = "reset";
    reset.style="width:80px; height:40px; margin:5px 5px; " ;
    document.getElementById("SaveDiv").appendChild(reset);
    document.getElementById("reset").innerHTML="Reset" ;
    reset.addEventListener("click", clear);

function saveGrid(){
    var savedArray = [];
    var gridName = prompt("please insert a name", " ");
    var allsquares = document.getElementsByClassName("square");
    for (var z=0; z<allsquares.length; z++){
        var currSquare = allsquares[z];
        var saveObject = {};
        saveObject.x = currSquare.x;
        saveObject.y = currSquare.y;
        saveObject.color =  currSquare.style.backgroundColor;
        savedArray.push(saveObject);

    }

    localStorage.setItem(gridName, JSON.stringify(savedArray));
    alert("grid Saved");
}

function clear(){
    var allsquares = document.getElementsByClassName("square");
    for (var z= allsquares.length - 1; z >= 0; z--) {
     var curSquare = allsquares[z];
     curSquare.style.backgroundColor="white";
    }
}

function loadGrid(){
    var localKeys=[];
      for (var i = 0; i < localStorage.length; i++) {
          var curKey = localStorage.key(i);
          localKeys.push(curKey);
      }
    var gridName= prompt("what grid name do you want to upload? "+ localKeys);
    var loadedGrid = localStorage.getItem(gridName);

    var allsquares = document.getElementsByClassName("square");
    var allData = JSON.parse(loadedGrid);
    for (var i = 0; i < allData.length-1 ; i++) {
        var curSquare = allData[i];
        var currSquareDiv = allsquares[i];
        console.log(curSquare.color);
        currSquareDiv.style.backgroundColor = curSquare.color ;
    }

}

