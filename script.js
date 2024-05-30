
const elmnt = document.getElementById("breakout");

var aHeight = 0;
var aTallDiv = "";

var backPos = Math.floor(Math.random() * 75);
const css = window.document.styleSheets[0];
css.insertRule(`
  .headerCont {
    background-position-x:` + backPos + `%;
  }
`, css.cssRules.length);

window.onload = function() {
  //headerPos();
  
  var col = document.getElementById("body");
  
  elmnt.scrollLeft += elmnt.scrollWidth*.12 - elmnt.offsetWidth/2 ;
  
  //Icon chart image population
  var icon = new Image();
  icon.src = "/assets/pictogram.svg/assets";
  icon.classList.add("personIcon");
  
  populateIcons(document.getElementById("ib50"),2, icon);
  populateIcons(document.getElementById("i50"),4, icon);
  populateIcons(document.getElementById("i60"),9, icon);
  populateIcons(document.getElementById("i70"),15, icon);
  populateIcons(document.getElementById("ia80"),21, icon);  

  annotationArray.forEach((a,i)=> {
    createAnnotation(a);
});

    yearsArray.forEach((y,i)=> {
    createYear(y);
});
  
  document.getElementById("breakoutText").style.height = (aHeight - .15 * window.innerHeight) + "px";

// Scroll for the FoG Section

var pos = document.getElementById("breakout");
console.log(pos);
var number = pos.innerHTML;
var timeOut = 0;

var scrollFoG = function(e) {
  if (e.type == "mousedown") {
    timeOut = setInterval(function() {
      if (e.target.id == "breakoutRightArrow")
        document.getElementById('breakout').scrollLeft += 10;
      else document.getElementById('breakout').scrollLeft -= 10;
    }, 100);
  }

  if (e.type == "mouseup") {
    clearInterval(timeOut);
  }
};

  document.getElementById("breakoutRightArrow").addEventListener("mousedown", scrollFoG, false)
  document.getElementById("breakoutRightArrow").addEventListener("mouseup", scrollFoG, false)

  document.getElementById("breakoutLeftArrow").addEventListener("mousedown", scrollFoG, false)
  document.getElementById("breakoutLeftArrow").addEventListener("mouseup", scrollFoG, false)


  // Modal stuff
  var modal = document.getElementById("legendModal");
  var modalBG = document.getElementById("legendBackground");

  var btn = document.getElementById("modalBtn");

  // Get the <span> element that closes the modal
  var close = document.getElementById("close");

  // When the user clicks on the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
    modalBG.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  close.onclick = function() {
    modal.style.display = "none";
    modalBG.style.display = "none";
  }


}


window.addEventListener('resize', onResize);


//<div id="a1" class="aDiv" ><p class="aText">The last time we went to the movies together</p><span class="aPill aGrief">Grief</span><span class="aPill aConn">Connection</span></div>

function headerPos(){
  var header = document.getElementById("header");
  header.style.backgroundPositionX = Math.floor(Math.random() * 75) + "%";
  header.style.visibility = "visible";
}


function createAnnotation(aObject){
  var annotation = document.createElement("div");
  annotation.id = aObject.DivID;
  annotation.classList.add("aDiv");
  annotation.style.left = Math.round(aObject.Pos*elmnt.scrollWidth) + "px";
  annotation.style.maxWidth = aObject.SizeW + "px";
  annotation.style.minWidth = (aObject.SizeW-50) + "px";
  annotation.innerHTML = "<p class='aText'>" + aObject.Text +"</p>";
  document.getElementById("breakoutText").appendChild(annotation);
  var annotObject = document.getElementById(aObject.DivID);
  if (aObject.Tag1.length > 0) {annotObject.appendChild(createPill(aObject.Tag1));}
  if (aObject.Tagbreak == 1){annotObject.innerHTML += "<p class='smallBreak'></p>"}
  if (aObject.Tag2.length > 0) {annotObject.appendChild(createPill(aObject.Tag2));}
  if ((aObject.Tagbreak == 1 && aObject.Tag3.length > 0) || aObject.Tagbreak == 2){annotObject.innerHTML += "<p class='smallBreak'></p>"}
  if (aObject.Tag3.length > 0) {; annotObject.appendChild(createPill(aObject.Tag3));}
  if (aObject.Tagbreak == 1 && aObject.Tag4.length > 0){annotObject.innerHTML += "<p class='smallBreak'></p>"}
  if (aObject.Tag4.length > 0) {; annotObject.appendChild(createPill(aObject.Tag4));}
 
  var heightCheck = document.getElementById(aObject.DivID).offsetHeight;
  if (heightCheck > aHeight) {
    aHeight = heightCheck;
    aTallDiv = aObject.DivID;
  }
}

function createPill(tag){
  var pill = document.createElement("span");
  pill.classList.add("aPill");
  if (tag == "grief") {
    pill.classList.add("aGrief");
    pill.innerText = "Grief";
  } else if (tag == "connection") {
    pill.classList.add("aConn");
    pill.innerText = "Connection";
  } else if (tag == "death") {
    pill.classList.add("aDeath");
    pill.innerText = "A death";
  } else if (tag == "anguish") {
    pill.classList.add("aAnguish");
    pill.innerText = "Anguish";
  } else if (tag == "healthanxiety") {
    pill.classList.add("aHealthA");
    pill.innerText = "Health anxiety";
  } else if (tag == "gratitude") {
    pill.classList.add("aGrat");
    pill.innerText = "Gratitude";
  } else if (tag == "guilt") {
    pill.classList.add("aGuilt");
    pill.innerText = "Guilt";
  } else if (tag == "longing") {
    pill.classList.add("aLonging");
    pill.innerText = "Longing";
  } else if (tag == "numb") {
    pill.classList.add("aNumb");
    pill.innerText = "Numb";
  } else if (tag == "forbearance") {
    pill.classList.add("aForb");
    pill.innerText = "Forbearance";
  } else if (tag == "relief") {
    pill.classList.add("aRelief");
    pill.innerText = "Relief";
  } else if (tag == "familyconflict") {
    pill.classList.add("aFamcon");
    pill.innerText = "Family conflict";
  } else if (tag == "joy") {
    pill.classList.add("aJoy");
    pill.innerText = "Joy";
  } else if (tag == "empathy") {
    pill.classList.add("aEmpathy");
    pill.innerText = "Empathy";
  } else {
    return
  }
  return pill
}

function onResize(){
  annotationArray.forEach((a,i)=> {
    resizeAnnotation(a);
});
    document.getElementById("breakoutText").style.height = (aHeight - .15 * window.innerHeight + 10) + "px";
}

function resizeAnnotation(aObject){
  document.getElementById(aObject.DivID).style.left = Math.round(aObject.Pos*elmnt.scrollWidth) + "px";
  var heightCheck = document.getElementById(aObject.DivID).offsetHeight;
  if (heightCheck > aHeight) {
    aHeight = heightCheck;
    aTallDiv = aObject.DivID;
  }
}


function createYear(aObject){
  var yearMark = document.createElement("div");
  yearMark.id = aObject.divID;
  yearMark.classList.add("yDiv");
  yearMark.style.left = Math.round(aObject.Pos*elmnt.scrollWidth) + "px";
  yearMark.innerHTML = aObject.Year;
  document.getElementById("breakoutYears").appendChild(yearMark);
}



function populateIcons(divId, noIcons, iconImg) {
// function for adding icons to a div
  
  var  iconRow = document.getElementById("divId");
  
  for (let i = 0; i < noIcons; i++) {
  divId.appendChild(iconImg.cloneNode(true));
  }
}


