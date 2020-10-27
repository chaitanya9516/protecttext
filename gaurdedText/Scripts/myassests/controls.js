var password = "chaitanya";
var salt = "acbedgf123321";
var inithash = "";
var siteurl = "";
var seperator = "acdcc9e377db73f8b3ae141353015db7c8141a659c465cb3f42ed93e3727e8d5ff4743c887a6816821789df7914749a1ff722455b26057b6058011f3ba8886b5";

function closeTab()
{
    //gettin tab button and textarea's id 
    var getactiveelems = document.getElementsByClassName("border rounded actual-textarea tab-pane active")[0].id;
    let getactiveelems2 = document.getElementsByClassName("tablinks active")[0].id;
    
    //console.log(getactiveelems);
   //console.log(getactiveelems2);

    if (getactiveelems != 1 || getactiveelems2 != 1) {

        //remove tab and corresponding text area
        document.getElementById(getactiveelems).remove();
        document.getElementById(getactiveelems2).remove();

        //activiating previous text area and tab-btn as active       
        getactiveelems = parseInt(getactiveelems.substr(getactiveelems.lastIndexOf("-") + 1));
        let prev_tab = getactiveelems - 1;
        //console.log(prev_tab);

        // console.log("Making tab with id "+prev_tab+" active");
        var tab = document.getElementById("tab-btn-" + prev_tab);
        var textarea = document.getElementById("txttab-" + prev_tab);
        tab.className += " active"; //tab
        textarea.className += " active"; //textarea
        savebtn();

    }

    else
    {
        //show error cant delete tab 1
        alert("You Can't delete tab-1")
    }

}

function scenario_func() {

    let val = document.getElementById("hidden_field").value;
    //console.log(val);
    let scenario_ses = sessionStorage.setItem("create_site_val2", val);
    //console.log(scenario_ses);
}

function loadlayout()
{
    let charlength = localStorage.getItem("charcount");
    let tablength = localStorage.getItem("tabnumber");
    console.log(tablength);
    console.log(charlength);
    var i;
    for (i = 0; i <= tablength; i++)
    {
        creatingTabs();
        let fetchtext = sessionStorage.getItem("sitedata");
        var res = fetchtext.split(seperator).slice(1, fetchtext.length);
        //creatingTabs();
        var a = document.getElementsByClassName("actual-textarea")[i].innerHTML = res[i];
        console.log(a);  
    }

}

function enterpassword() {

    let compare_pass = document.getElementById("password_field").value;
    console.log("password ="+compare_pass);
    let inithash = CryptoJS.SHA512(salt + compare_pass).toString();
    sessionStorage.setItem('hash', inithash);
    console.log(inithash);
    let site = sessionStorage.getItem("sitename");
    console.log("site name =" + site);
    
    let iv = CryptoJS.enc.Hex.parse('be410fea41df7162a679875ec131cf2c');

    $.ajax({
        url: "/Home/enterpass",
        type: "POST",
        data: {
            site_url: site,
            hashcontent: inithash,
        },
        dataType: "json",
        success: function (data) {
            if (data.success)
            {
                let decipher = data.text[0];
                var decrypt = CryptoJS.AES.decrypt(decipher, password, 
                {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }
                ).toString(CryptoJS.enc.Utf8);
                sessionStorage.setItem("sitedata", decrypt);
                window.location.href = data.redirect;

            } 
            else
            {
                alert(data.msg);
            }
          
        },
        error: function (err) {

            alert("unable to load please try again");
            console.log(err);
        }

    });


}

function setpassword()
{
    var password_field = document.getElementById("password_field").value;
    let confirm_password = document.getElementById("confirm_password_field").value;
    //console.log(password_field);
    //console.log(confirm_password);
    if (password_field == confirm_password && password_field != null)
    {
         inithash = CryptoJS.SHA512(salt + confirm_password).toString();
        //var sitename = window.location.pathname.substring(1);
        //siteurl = $("#create-site-txtbox").val();
        let site = sessionStorage.getItem("sitename");
        sessionStorage.setItem('hash', inithash);
        console.log(site);

        $.ajax({
            url: "/Home/createsite",
            type: "POST",
            data: {
                site_url: site,
                hashcontent: inithash,
            },
            dataType: "json",
            success: function (data) {
              
                window.location.href = data.redirect;
            },
            error: function (err) {

                alert("unable to load please try again");
                console.log(err);
            }

        });
       
    }
    else
    {
        alert("Passwords must match");
    }
 
}


function opensite() {

    siteurl = $("#create_site_txtbox").val();
    let session = sessionStorage.setItem("sitename", siteurl);
    console.log(session);
    $.ajax({
        type: "POST",
        url: "/Home/checkmail?sitename=" + siteurl,
        data: {sitename:siteurl},
        contenttype: "applicationjson; charset=utf-8",
        dataType: "json",
        success: function(result) 
        {
           window.location.href = result.redirect; 
        }

    });
}

function savebtn() {
    var allText = gatheringtxt();
    let site = sessionStorage.getItem("sitename");
    let hash = sessionStorage.getItem("hash");
    var cipher = CryptoJS.AES.encrypt(allText, password).toString();
 //////////////////////////////////////////////////////////////////////////////////////////////
    //let tabcount = document.getElementById("tabdiv").children.length;
    var txtareaelements = document.querySelectorAll("textarea");
    //console.log(txtareaelements);
    let sub = txtareaelements.length - 1;
    //console.log(sub);
    var array = [];
    //var array2 = [];
        
    var i;
    for (i = 0; i <= sub; i++) {
      
        let a = txtareaelements[i].value.length;
        //let tabcount = document.querySelector("textarea");
        //tabcount.value.length;
        if (i == 0)
        {
            array[array.length] = a;
            //console.log(array);
        }
        else
        {
            array.push(a);
           //console.log(a);

        }
       
 
    }
    //localStorage.setItem("charcount", array);
    localStorage.setItem("tabnumber", sub);

    //return (cipher);
    var dataObj = {  
        site_url: site,
        hashcontent: hash,
        cipher: cipher
        
    }
            
      $("#content").html("<b>please wait...<b>");
           
    $.ajax({
         url: "/Home/createtabs",
         type: "POST",
         data: dataObj,
         dataType: "json",
        success: function (data) {
            alert(data.msg);
            $("#content").hide();
        },
        error: function (err) {

          $("#content").html("<div class='failed'> please try again,try to enter only 100000 charecters..! </div>");
        }

    });


}