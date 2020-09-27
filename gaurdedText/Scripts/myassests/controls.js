var password = "chaitanya";
var salt = "acbedgf123321";
var inithash = "";
var siteurl = "";


 //function loadlayout()
 //{
 //   let site2 = sessionStorage.getItem("sitename");
 //    console.log(site2);
   
 //    $.ajax({
 //        url: "/Home/getusertext?sitename=" + site2,
 //        type: "POST",
 //        data: {
             
             
 //        },
 //        dataType: "json",
 //        success: function (data) {

 //            var dec = CryptoJS.AES.decrypt(data, password).toString();
 //            document.getElementsByTagName("html")[0].innerHTML = dec;
 //        },
 //        error: function (err) {

 //            alert("unable to load please try again");
 //            console.log(err);
 //        }

 //    });
   

 //}

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
    //return (cipher);
    var dataObj = {  
        site_url: site,
        hashcontent: hash,
        cipher: cipher,
        
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