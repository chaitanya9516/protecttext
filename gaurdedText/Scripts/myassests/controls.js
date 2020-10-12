var password = "chaitanya";
var salt = "acbedgf123321";
var inithash = "";
var siteurl = "";

function scenario_func() {

    let val = document.getElementById("hidden_field").value;
    //console.log(val);
    let scenario_ses = sessionStorage.setItem("create_site_val2", val);
    //console.log(scenario_ses);
}

function loadlayout() {
    let charlength = localStorage.getItem("charcount");
    let tablength = localStorage.getItem("tabnumber");
    // let tablen = Number(tablength) - 1;
    console.log(tablength);
    console.log(charlength);
    var i;
    for (i = 0; i <= tablength; i++) {
        creatingTabs();
        

        if (i == 0) {
            let fetchtext = sessionStorage.getItem("sitedata");
            //let generatetabs = creatingTabs();
            //let makeactive = active2();
            let val1 = charlength.split(',')[i];
            let value1 = Number(val1);

            let res = fetchtext.substring(128, value1);
            var a = document.getElementsByClassName("actual-textarea")[i].innerHTML = res;
            console.log(a);
        }
        else {
            let fetchtext = sessionStorage.getItem("sitedata");
            //let generatetabs = creatingTabs();
            //let makeactive = active2();
            let val2 = charlength.split(',')[i];
            let value2 = Number(val2);

            let countingchar = value2 + 128;
            let b1 = countingchar.value;
            console.log(b1);
            let res = fetchtext.substring(countingchar, value2);
            var b = document.getElementsByClassName("actual-textarea")[i].innerHTML = res;
            console.log(b);
        }
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
    console.log(txtareaelements);
    let sub = txtareaelements.length - 1;
    console.log(sub);
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
            console.log(array);
        }
        else
        {
            array.push(a);
            console.log(a);

        }
       
        
            //array[array.length] = a;
            //var tabcount = array.push(array2);
            //console.log(tabcount);
 
    }
    localStorage.setItem("charcount", array);
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