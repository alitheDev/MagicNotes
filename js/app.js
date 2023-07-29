 
console.log("Welcome to notes app. This is app.js");

// show notes is added here because the notes will appear by default on the brower
showNotes();

/* If user adds a note, add it to the localStorage */


//Retriving (getting) the add-button data.
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function(e) {
  // get the addTxt from browser.
  let addTxt = document.getElementById("addTxt");

  // from local storage get the notes.
  let notes = localStorage.getItem("notes");

 // if notes are null 
  if (notes == null) {
  // set the notesObj to empty.
    notesObj = [];
  } 
  
  else {
    // shift the notes into notesObj.
    notesObj = JSON.parse(notes);
  }

// put the addTxt value to NotesObj
notesObj.push({ text: addTxt.value, starred: false });


/* save them in local storage */
// converting it again stringfy.
localStorage.setItem("notes", JSON.stringify(notesObj));
  
  addTxt.value = "";
//   console.log(notesObj);
  showNotes();
});


// --------------------- //
/* Show Functionality */
// --------------------- //

// Function to show elements from localStorage
function showNotes() {

  // get the notes from local storage
  let notes = localStorage.getItem("notes");
  
  


  // if notes are null then set the notesObj to empty
  if (notes == null) {
    notesObj = [];
  } 
  // else parse the notes.
  else {
    notesObj = JSON.parse(notes);
  }

  // let html is empty.
  let html = "";

// get started notes
  // let starredNotes = getStarredNotes();

// show the notes
  notesObj.forEach(function(element, index) {
    html += `
    <div class="noteCard my-2 mx-2 card ${element.starred ? 'border-warning' : ''}" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Note ${index + 1}</h5>
      <p class="card-text"> ${element.text}</p>
      <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
      <button id="${index}" onclick="toggleStarred(this.id)" class="btn btn-info ml-2">
        ${element.starred ? 'Unstar' : 'Star'}
      </button>
    </div>
  </div> 
                
                
                `;
  }
  
  );
  
  // store the notes in "notesElm" variable.
  let notesElm = document.getElementById("notes");
  
  // if notes are not empty then show notes.
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } 
  
  // if notes are empty.
  else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}


// --------------------- //
/* Delete Functionality */
// --------------------- //

function deleteNote(index) {
//   console.log("I am deleting", index);

// get the notes from the localstorage
  let notes = localStorage.getItem("notes");
// if notes are null then set NotesObj to empty.  
  if (notes == null) {
    notesObj = [];
  } 

  // parse the notes.
  else {
    notesObj = JSON.parse(notes);
  }

  // splice method deletes from the array. 
  notesObj.splice(index, 1);
  // set the notes after removing
  localStorage.setItem("notes", JSON.stringify(notesObj));
  // show notes
  showNotes();
}


// --------------------- //
/* Search Functionality */
// --------------------- //

// search the "searchTxt"
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})


function showStarredNotes() {
  // Get the notes from local storage
  let notes = localStorage.getItem("notes");

  // If notes are null, set notesObj to an empty array
  let notesObj = notes ? JSON.parse(notes) : [];

  // Filter out only the starred notes
  let starredNotes = notesObj.filter((note) => note.starred);

  // If there are no starred notes, display a message
  if (starredNotes.length === 0) {
    document.getElementById("starredNotes").innerHTML =
      "No starred notes found.";
    return;
  }

  // Generate the HTML for displaying the starred notes
  let html = "";

  starredNotes.forEach(function (element, index) {
    html += `
      <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Starred Note ${index + 1}</h5>
          <p class="card-text">${element.text}</p>
        </div>
      </div>`;
  });

  // Display the starred notes in the "starredNotes" section
  document.getElementById("starredNotes").innerHTML = html;
}



/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/ 