// var perc = document.getElementById('perc');
// var time = 0;

// function updatePerc(){
//     var p = 100*(1-2**(-time/100));
//     perc.innerHTML = Math.floor(p)+'%';
//     time++;
// }

// setInterval(updatePerc, 50)

// window.onload = function() {
//     clearInterval()
//     perc.innerHTML = '100%';
//     this.setTimeout(function(){
//         document.getElementById('loading').className = '';
//     }, 500)
// }        

var sections = document.getElementsByTagName("section");
var winHeight, progress, sectionUnit, sectionCurrent;


function show(n){
    for (var i=0; i<sections.length; i++){
        sections[i].className = "";
    }
    sections[n].className = "active";
    
}

function load() {
    winHeight = window.innerHeight*sections.length;
    document.body.style.height = winHeight + "px";

    sectionUnit = 1/(sections.length-1);

    window.scrollTo(0, 0);
}

function scroll() {
    progress = window.scrollY / (winHeight - window.innerHeight);
    sectionCurrent = Math.round(progress/sectionUnit);
    show(sectionCurrent);
    console.log(sectionCurrent)
}

window.onload = load;

window.onscroll = scroll;