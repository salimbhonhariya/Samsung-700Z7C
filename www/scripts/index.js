// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

(function () {
    "use strict";

    // Call onDeviceReady when PhoneGap is loaded.
    // At this point, the document has loaded but phonegap-1.0.0.js has not.
    // When PhoneGap is loaded and talking with the native device,
    // it will call the event `deviceready`.
    // alert("Before document ready fired:Document loaded message ");
    //initialize();



    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    // At this point PhoneGap is loaded and it is now safe to make calls PhoneGap methods



    // It signals that Cordova's device APIs have loaded and are ready to access.
    function onDeviceReady() {

        // Now safe to use the PhoneGap API native code
        //alert("OnDeviceReady fired.");

        // from in -app browser, you don't have access to native API.
        // window.open("https://s.zipformonline.com");
        // var ref = cordova.InAppBrowser.open("https://r.zipformplus.com", '_blank', 'location=no');
        // window.open = cordova.InAppBrowser.open;


        //6/1
        //var targetUrl = "https://r.zipformplus.com";
        //window.location.replace(targetUrl);

        //var targetUrl = "https://r.zipformplus.com";

        //get the user name, email and option checked from local sotrage and replace the variables in this string before it loads.
        // alert("onDeviceReddy Invoked");

        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);


        //document.addEventListener("backbutton", onBackKeyDown, false);

        //Can't add in here
        //document.addEventListener('showpopup', showpopup.bind(this), false);



        // var element = document.getElementById("deviceready");
        // element.innerHTML = 'Device Ready';
        // element.className += ' ready';

        initialize();

        $('#btnCredentials').click(showcredentialpage);
        $('#btnloadZipform').click(loadZipformsWindowLocation);
        $('#btnResources').click(loadeducationalresources);
        $('#clearlocalstorage').click(clearlocalstorage);
        $('#getcredentials').click(savecredentials);
        $('#goHome').click(showindexpage);

      
        // $('#btnCamera').click(takePicture);


    }
    // Call back functions out side of device ready.

    //function onBackKeyDown() {
    //    // Handle the back button
    //    showindexpage();
    //}


    function showindexpage() {
       // alert(this.id);
     
    }

    function clearlocalstorage() {
        window.localStorage.clear();
        location.reload();
        //$('#alert').html("<strong>Warning!</strong> Your local storage is cleared..");
        return;
    }
    function takePicture() {
        // execute only when camera  button is clicked

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI
        });
    }

    function initialize() {
        if (window.localStorage.getItem('username')) {

            //if (jQuery('#id').data('clicked')) {
            //    //clicked element, do-some-stuff
            //} else {
            //    //run function2
            //    loadZipformsWindowLocation();
            //}


            //var hasBeenClicked = false;
            //jQuery('#id').click(function () {
            //    hasBeenClicked = true;
            //});

            //if (hasBeenClicked) {
            //    // The link has been clicked.
            //} else {
            //    // The link has not been clicked.
            //}
            loadZipformsWindowLocation();
            
        }
        else {
            showcredentialpage();
            //show login page of the application, user is logging first time in application.
            // $.mobile.changePage("#one", { reverse: false, transition: "slide" });
        }
    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    }

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    }

    function onSuccess(imageURI) {
        var image = document.getElementById('myImage');
        image.src = imageURI;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }

    function showcredentialpage() {
        if (localStorage.getItem("username") === null) {
            collectCredentials();
        }
        else {
            retrievecredentialsfromstorage();
        }
    }


    function collectCredentials() {
        $('#one').hide();
        $('#credentials').show();

    }
    function loadZipformsWindowLocation() {

        var user = window.localStorage.getItem('username');
        var email = window.localStorage.getItem('email');
        var typeofcredential = window.localStorage.getItem('typeofcredential');
        //for production

        var targetUrl = "https://m.zipformonline.com/login.aspx?usr=" + user + "&pwd=" + email + "&assoc=" + typeofcredential;
        window.location.href = targetUrl;


        //for QA
        // targetUrl = "https://q.zipformonline.com/login.aspx?usr="+ user +"&pwd="+ email +"&assoc=" +typeofcredential;
        //window.location.replace(targetUrl);


        //window.location.replace(targetUrl);
        // window.open(targetUrl, null, "location=no");
        //var ref = cordova.InAppBrowser.open(targetUrl, '_blank', 'location=no');
        //window.open = cordova.InAppBrowser.open;
    }

    function retrievecredentialsfromstorage() {

        var user = window.localStorage.getItem('username');
        var email = window.localStorage.getItem('email');
        var typeofcredential = window.localStorage.getItem('typeofcredential');

        document.getElementById("username").value = user;
        document.getElementById("email").value = email;

        // check which radio button to check while loading the page
        if (typeofcredential) {
            getwhichcheckboxchecked();
        }

        $('#one').hide();
        $('#credentials').show();
    }

    function getwhichcheckboxchecked() {
        {
            var typeofcredential = window.localStorage.getItem('typeofcredential');

            //zipformcredentialckecked
            if (typeofcredential === "0") {
                document.getElementById("radio-choice-v-6a").checked = true;

                //carcredentialchecked
            } else if (typeofcredential === "1") {
                document.getElementById("radio-choice-v-6b").checked = true;
            //    //"othercredentialchecked";
            //} else {
            //    document.getElementById("radio-choice-v-6c").checked = true;

            }
        }

    }
    function savecredentials() {

        //if username is empty
        if ($("#username").val() === '') {
            $('#alert').html("<strong>Warning!</strong> You left the username empty");
            $('#alert').fadeIn().delay(1000).fadeOut();
            return false;
        }


        //if the email is empty
        if ($("#email").val() === '') {
            $('#alert').html("<strong>Warning!</strong> You left the email empty");
            $('#alert').fadeIn().delay(1000).fadeOut();
            return false;
        }

        var uname = $("[name='username']").val();
        var _email = $("[name='email']").val();
        var typeofcredential = getcredentialtypechecked();

        window.localStorage["username"] = uname;
        window.localStorage["email"] = _email;
        window.localStorage["typeofcredential"] = typeofcredential;
        // alert("Inserted into local storage username:  " + uname + " and email:  " + _email + "" + typeofcredential);
    }

        function getcredentialtypechecked() {
            var credentialchecked;
            //credentialchecked = "zipformcredentialckecked";
            if (document.getElementById("radio-choice-v-6a").checked) {

                credentialchecked = "0";
                //credentialchecked = "carcredentialchecked";
            } else if (document.getElementById("radio-choice-v-6b").checked) {
                credentialchecked = "1";

            }
                //credentialchecked = "othercredentialchecked";
            else {
                credentialchecked = "2";
            }
            return credentialchecked;
    }
    function loadeducationalresources() {
        alert("load educational resources method invoked");
    }

})();



//var app = {
//    // Application Constructor
//    initialize: function () {
//        this.bindEvents();
//    },
//    // Bind Event Listeners
//    //
//    // Bind any events that are required on startup. Common events are:
//    // 'load', 'deviceready', 'offline', and 'online'.
//    bindEvents: function () {
//        document.addEventListener('deviceready', this.onDeviceReady, false);
//    },
//    // deviceready Event Handler
//    //
//    // The scope of 'this' is the event. In order to call the 'receivedEvent'
//    // function, we must explicitly call 'app.receivedEvent(...);'
//    onDeviceReady: function () {
//        app.receivedEvent('deviceready');
//    },
//    // Update DOM on a Received Event
//    receivedEvent: function (id) {
//        var parentElement = document.getElementById(id);
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');

//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');


//        document.addEventListener('pause', onPause.bind(this), false);
//        document.addEventListener('resume', onResume.bind(this), false);


//        // execute only when camera  button is clicked
//        document.getElementById('camera').addEventListener('click', function (e) {
//            navigator.camera.getPicture(onSuccess, onFail, {
//                quality: 50,
//                destinationType: Camera.DestinationType.FILE_URI
//            });
//        });

//        // execute only when zipform  button is clicked
//        document.getElementById('Button1').addEventListener('click', function (e) {
//            var targetUrl = "https:\\s.zipformonline.com";
//            window.location.replace(targetUrl);
//            return false;
//        });

//        // execute only when credential  button is clicked, It opens anothe screen to take initial input.
//        document.getElementById('Button2').addEventListener('click', function (e) {
//            var targetUrl = "credentials.html";
//            window.location.replace(targetUrl);
//            //    $(document).ready(function () {
//            saveCredentials();
//            //    });

//        });


//        // execute only when zipform  button is clicked
//        document.getElementById('btnshowpopup').addEventListener('click', function (e) {
//            alert("Popup");
//        });



//        console.log('Received Event: ' + id);
//    }
//};

//function onPause() {
//    // TODO: This application has been suspended. Save application state here.
//};

//function onResume() {
//    // TODO: This application has been reactivated. Restore application state here.
//};


//function onSuccess(imageURI) {
//    var image = document.getElementById('myImage');
//    image.src = imageURI;
//};

//function onFail(message) {
//    alert('Failed because: ' + message);
//};

//// $(document).ready(function () {
//function saveCredentials() {
//    debugger;
//    var uname = $("[name='username']").val();
//    var _email = $("[name='email']").val();
//    alert("Inserting into local storage");
//    alert(uname);
//    alert(_email);

//    window.localStorage.setItem("username", uname);
//    window.localStorage["email"] = _email;

//    // $.mobile.changePage("#page2", { reverse: false, transition: "slide" });


//    //$('#output').html("Username: " + window.localStorage.getItem("username") + "<br>" +
//    //                    "Email: " + window.localStorage["email"]
//    //                );
//    //alert("Reading from local storage");
//    //alert(window.localStorage.getItem("username"));
//    //alert(window.localStorage.getItem("email"));

//    //// $('#page2').show();
//    return false;
//}







