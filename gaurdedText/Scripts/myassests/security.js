var seperator = "acdcc9e377db73f8b3ae141353015db7c8141a659c465cb3f42ed93e3727e8d5ff4743c887a6816821789df7914749a1ff722455b26057b6058011f3ba8886b5"
// var password = document.getElementById("password").value; 


// var site_url = window.location.pathname;
 var initHash = "";
 var newHash = "";
// //site_url = site_url.substr(1,site_url.length-2)
// var seperator = "acdcc9e377db73f8b3ae141353015db7c8141a659c465cb3f42ed93e3727e8d5ff4743c887a6816821789df7914749a1ff722455b26057b6058011f3ba8886b5";
// var unsaved = false;
// var salt = "~~securetext.in~~"; //stay safe from rainbow tables
// var initialText = "";
// console.log(password);
//var getalltext = localStorage.getItem("alltext");
//var plaintext = "";
var password = "";
var initialText = "";
var Cipher = "";
function convert123() {
   let plaintext = document.getElementById("Plaintext").value;
	password = document.getElementById("Password").value;

	//console.log(initialText);
	// var getalltext = localStorage.getItem("alltext");
	// var allText = getalltext;

	let encryptedtext = CryptoJS.AES.encrypt(plaintext, password).toString();
	Cipher = encryptedtext;
	//console.log(actualCipher);
	let label = document.getElementById("label").innerHTML = encryptedtext;
	 
	if(initHash=="")
	{
		//new site
		// initHash = CryptoJS.SHA512(allText + CryptoJS.SHA512(password).toString()).toString();
		initHash = CryptoJS.SHA512(salt+password).toString();
		newHash = initHash;
		// console.log("Computed new hash");
	}

	else
	{
		// newHash = CryptoJS.SHA512(allText + CryptoJS.SHA512(password).toString()).toString();
		newHash = CryptoJS.SHA512(salt+password).toString();

	}    
	

}

function decrypt() {
	//console.log("decrypting " + actualCipher + " with " + password);
	var decrypted = CryptoJS.AES.decrypt(Cipher, password).toString(CryptoJS.enc.Utf8);
	initialText = decrypted;
	let label = document.getElementById("label_2").innerHTML = initialText;

}

