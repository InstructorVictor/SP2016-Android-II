/*
-	Project Author: Victor Campos <vcampos@swccd.edu>
-	Project Name:	mySDCE
-	Version:		1.20160322
-	Date:			2016-03-22
-	Description:	The Unofficial SDCE app
*/
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );
    
    function onDeviceReady() {
		console.log("Cordova is ready!");
		navigator.splashscreen.hide();
		
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
		
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        // document.getElementById("btnURL").onclick = function() {};
		$(".btnURL").on("click", function() { getURL($(this)) });
		function getURL(theURL) { 
			navigator.vibrate(250);
			cordova.InAppBrowser.open(theURL.data("url"), "_blank", "location=yes");
		}
		$("#btnFeedback").on("click", function() { getFeedback() });
		function getFeedback() {
			navigator.notification.beep(1);
			navigator.notification.alert(
				'You are the winner!',  // message
				alertDismissed,         // callback
				'Game Over',            // title
				'Done'                  // buttonName
			);
		}
		function alertDismissed() {
			// do something
		}
		function onPrompt(results) {
			alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
		}

		/*navigator.notification.prompt(
			'Please enter your name',  // message
			onPrompt,                  // callback to invoke
			'Registration',            // title
			['Ok','Exit'],             // buttonLabels
			'Jane Doe'                 // defaultText
		);*/
		$("#btnTakePhoto").on("click", function() { getTakePhoto() });
		function getTakePhoto() {
			navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
				destinationType: Camera.DestinationType.FILE_URI,
				saveToPhotoAlbum: true
			});
		}
		
		function onSuccess(imageData) {
			var image = document.getElementById('myImage');
			image.src = imageData;
		}

		function onFail(message) {
			alert('Failed because: ' + message);
		}
		$("#btnName").on("click", function() { getName() });
		function getName() {
			console.log("Clicked!");
			//var userName = prompt("What's your name?");
			localStorage.userName = prompt("What's your name?");
			console.log(localStorage.userName);
			if((localStorage.userName == "") || (localStorage.userName == "null") || (localStorage.userName == undefined)) {
				// Nothing
				console.log("localStorage is currently: " + localStorage.userName);
				alert("Please a valid name!");
			} else {
				$(".welcomeMessage").html(" " + localStorage.userName.replace(/[^a-zA-Z]/g, ''));
			}
		}
		function loadName() {
			if((localStorage.userName == "") || (localStorage.userName == null) || (localStorage.userName == undefined)) {
				// Nothing
				console.log("localStorage is currently: " + localStorage.userName);
			} else {
				$(".welcomeMessage").html(" " + localStorage.userName);
			}
		}
		loadName();
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();