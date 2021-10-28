
// Your web app's Firebase configuration - Edmond Niu
var firebaseConfig = {
    apiKey: "AIzaSyAlXCmEEJEft79lUUwWLjIWzeECXuwlLcc",
    authDomain: "lifestyleguide-1b9b7.firebaseapp.com",
    databaseURL: "https://lifestyleguide-1b9b7.firebaseio.com",
    projectId: "lifestyleguide-1b9b7",
    storageBucket: "lifestyleguide-1b9b7.appspot.com",
    messagingSenderId: "587591135305",
    appId: "1:587591135305:web:7536c3981a6b910fb70f98"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  
//function whose purpose is to gather data from website (prepare data)
var first, last, email, email2, text, rate, page
//funcitons to gather data
function dataPrep() {
    first = document.getElementById('firstName').value;
    last = document.getElementById('lastName').value;
    email = document.getElementById('emailAddress').value;
    email = removePeriods(email);
    //toast(email);
}

function dataPrep2() {
    email2 = document.getElementById('emailAddress2').value;
    text = document.getElementById('feedback').value;
    rate = document.getElementById('ratingSel').value;
    page = document.getElementById('page').value;
    email2 = removePeriods(email2);
    //toast(email2);
}

// Insert Functions to insert data into the firebase database for both forms
document.getElementById('insert').onclick = function(){
    dataPrep();

    firebase.database().ref('User Email/' + email).set({
        firstName: first,
        lastName: last,
        userEmail: email,
    });

    //toast("Thank you for your submission!");
}

document.getElementById('insert2').onclick = function(){
    dataPrep2();

    firebase.database().ref('User Email/' + email2).set({
        userEmail2: email2,
        feedbackText: text,
        satisfactionRating: rate,
        pageReviewed: page,
    });

    //toast("Thank you for your submission!");
}

//Select Data, prints the existing data to the table based on the key
document.getElementById('select').onclick = function() {
    dataPrep();
    firebase.database().ref('User Email/' + email).on('value', function(snapshot){
        const firstN = document.getElementById('firstVal');
        const lastN = document.getElementById('lastVal');
        const emailA = document.getElementById('emailVal');

        emailA.textContent =  addPeriods(snapshot.val().userEmail);
        firstN.textContent =  snapshot.val().firstName;
        lastN.textContent =  snapshot.val().lastName;
        
    })

    //toast("Selection Complete!");
}


document.getElementById('select2').onclick = function() {
    dataPrep2();
    firebase.database().ref('User Email/' + email2).on('value', function(snapshot){
        const id = document.getElementById('emailVal2');
        const name = document.getElementById('feedbackVal');
        const rated = document.getElementById('ratingVal');
        const pageR = document.getElementById('pageVal');
        //const  style= document.getElementById('ratingVal');

        id.textContent =  addPeriods(snapshot.val().userEmail2);
        name.textContent =  snapshot.val().feedbackText;
        rated.textContent =  snapshot.val().satisfactionRating;
        pageR.textContent = snapshot.val().pageReviewed;

        //style.textContent =  snapshot.val().Rating;  
    })

    //toast("Selection Complete!");
}


// Update Data, updates data to the database
document.getElementById('update').onclick = function(){
    dataPrep();
    // if you use 'set' it will replace existing fields with new ones
    // use 'update' to only modify existing fields

    firebase.database().ref('User Email/' + email).update({
        firstName: first,
        lastName: last,
    });
    //toast("Update Complete!");
}

document.getElementById('update2').onclick = function(){
    dataPrep2();

    firebase.database().ref('User Email/' + email2).update({
        feedbackText: text,
        satisfactionRating: rate,
        pageReviewed: page,
    });
    //toast("Update Complete!");
}


// Delete Data
document.getElementById('delete').onclick = function(){
    dataPrep();

    firebase.database().ref('User Email/' + email).remove();
    //toast("Delete Complete!");
}

document.getElementById('delete2').onclick = function(){
    dataPrep2();

    firebase.database().ref('User Email/' + email2).remove();
    //toast("Delete Complete!");
}
// function to insert email
function removePeriods(input) {
    //check if email contains periods
    if (input.indexOf(".") > -1) {
        //split email address at the periods
        var words = input.split(".")
        //variable to hold the final email address
        var concatenating = '';
        //iterate through the list of string fragments
        for (var i = 0; i < words.length; i++) {
            //build the string up using the string fragments and the proprietary character combination
            if(i <words.length-1) {
                concatenating += words[i].valueOf() + "_()";
            }
            else {
                concatenating += words[i].valueOf();
            }
        }
        email2 = concatenating.valueOf();
    }
    else {
        email2 = input;
    }
    return email2
}
// funciton to add periods back in
function addPeriods(input) {
    //check if email contains periods
    if (input.indexOf("_()") > -1) {
        //split email address at the periods
        var words = input.split("_()")
        //variable to hold the final email address
        var concatenating = '';
        //iterate through the list of string fragments
        for (var i = 0; i < words.length; i++) {
            //build the string up using the string fragments and the proprietary character combination
            if(i <words.length-1) {
                concatenating += words[i].valueOf() + ".";
            }
            else {
                concatenating += words[i].valueOf();
            }
        }
        email2 = concatenating.valueOf();
    }
    else {
        email2 = input;
    }
    return email2
}
//Toast for submitting the form
function toast(text) {
    text = "<span>" +String(text)+"<span";
    M.toast({html: text});
}


