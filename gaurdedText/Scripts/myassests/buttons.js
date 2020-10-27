
function change_pass() {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("change_password");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}

function save_new_pass()
{
    var password_field = document.getElementById("inputPassword1").value;
    let confirm_password = document.getElementById("inputPassword2").value;
    
    if (password_field == confirm_password && password_field != null) {
        inithash = CryptoJS.SHA512(salt + confirm_password).toString();        
        let site = sessionStorage.getItem("sitename");
        sessionStorage.setItem('hash', inithash);
        console.log(site);

        $.ajax({
            url: "/Home/change_password",
            type: "POST",
            data: {
                site_url: site,
                hashcontent: inithash,
            },
            dataType: "json",
            success: function (data) {
                var a = document.getElementById("inputPassword1");
                a.value = a.defaultValue;
                var b = document.getElementById("inputPassword2");
                b.value = b.defaultValue;
                let label = document.getElementById("new_password");
                label.style.color = 'red'
                label.innerHTML = "PASSWORD CHANGED SUCCESSFULLY!";
                
            },
            error: function (err) {

                alert("unable to load please try again");
                console.log(err);
            }

        });

    }
    else {
        alert("Passwords must match");
    }

}

function delete_site() {
    let site = sessionStorage.getItem("sitename");
    $.ajax({
        url: "/Home/delete_Site",
        type: "POST",
        data: {
            site_url: site,
            
        },
        dataType: "json",
        success: function (result) {
            window.location.href = result.redirect;
        },
        error: function (err) {

            alert("unable to load please try again");
            console.log(err);
        }

    });
}