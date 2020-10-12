//(function() {
//    creatingTabs()
//})()

var count = "";
var tabcount = "";

function creatingTabs() {
    count = document.getElementById("tabdiv").children.length;
    let add = count + 1;
    tabcount = add;
    // alert(tabcount);

    //creating tablinks
    let tabid1 = document.getElementById('tabdiv');
    createtab = document.createElement('button');
    createtab.id = 'tab-btn-' + tabcount;
    createtab.className = 'tablinks ';
    createtab.textContent = 'Tab-' + tabcount;
    createtab.setAttribute("onclick", "active()");
    tabid1.appendChild(createtab);

    // creating textarea
    let grabtextarea = document.getElementsByClassName('tab-content');
    let createtextarea = document.createElement('textarea');
    createtextarea.className = 'border rounded actual-textarea tab-pane ';
    createtextarea.id = `txttab-` + tabcount;
    createtextarea.setAttribute("placeholder", "Write your text here...tab" + tabcount);
    createtextarea.setAttribute("spellcheck", "false");
    createtextarea.setAttribute("wrap", "soft");
    createtextarea.setAttribute("maxlength", "100000");
    createtextarea.setAttribute("onchange", "gatheringtxt()");
    document.getElementsByClassName("tab-content")[0].appendChild(createtextarea);

    active2();
}
function active2() {

    //adding & removing active to class when u create a new tab-btn and txtarea
    let bringdiv = document.getElementById("tabdiv").children;
    for (var i = 0; i < bringdiv.length; i++) {
        //console.log(bringdiv);
        bringdiv[i].className = bringdiv[i].className.replace("active", "");
    }
    let bringdiv_2 = document.getElementById("txtareadiv").children;
    for (var i = 0; i < bringdiv_2.length; i++) {
        bringdiv_2[i].className = bringdiv_2[i].className.replace("active", "");
    }
    var count1 = document.getElementById("tab-btn-" + tabcount).className += " active";
    var count2 = document.getElementById("txttab-" + tabcount).className += " active";
}



function active() {

    //remove active in buttons
    let bringdiv = document.getElementById("tabdiv").children;
    for (var i = 0; i < bringdiv.length; i++) {
        //console.log(bringdiv);
        bringdiv[i].className = bringdiv[i].className.replace("active", "");
    }

    //targeting the clicked button's class and adding active to it
    let target = event.target; // || event.srcElement;
    let classname = target.classList;
    classname.add("active");

    //getting the present button elements id and storing it in a varible
    let target_2 = event.target;
    let id = target_2.id;
    let cutpart = id.substr(id.length - 1);
    // alert(cutpart); success

    //getting textareadiv and looping it replacing it with none
    let bringdiv_2 = document.getElementById("txtareadiv").children;
    for (var i = 0; i < bringdiv_2.length; i++) {
        bringdiv_2[i].className = bringdiv_2[i].className.replace("active", "");
    }
    let gettingtextarea = document.getElementById("txttab-" + cutpart).className += "active";
}


var allText2 = "";

function gatheringtxt() {
    var textareas = document.getElementsByClassName("actual-textarea");
    var seperator = "acdcc9e377db73f8b3ae141353015db7c8141a659c465cb3f42ed93e3727e8d5ff4743c887a6816821789df7914749a1ff722455b26057b6058011f3ba8886b5"
    var allText = "";

    for (var i = 1; i <= textareas.length; i++) {
        if (textareas[i - 1].value != "")
            allText = allText + seperator + textareas[i - 1].value;
    }
    //console.log("collected text : " + allText);

    return allText

    // localStorage.setItem("alltext", allText);
}

