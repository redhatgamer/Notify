const { ipcRenderer } = require('electron');

let notes = [];

let list = document.getElementById("list")

function loadNotes(){
    list.innerHTML = "";
    notes.forEach((note, idx) => {
        list.innerHTML += `
            <div class="list_ele">
                <h1>${idx} ${note.title} <h1>
                <p> ${note.note} <p>
            <div>
        `
    });
}

window.onload = async () => {
    notes = await ipcRenderer.invoke('get_data');
    loadNotes();  
};

btn.onclick = () => {
    if (title !== "" && note !== ""){
        let _note = {
            title : title.value,
            note : note.value,
        };

        notes.push(_note);
        loadNotes();


        ipcRenderer.send('save_note', _note);
    }else {
        window.alert("Please fill in all the fields and try again.");
    }
};

function setUpDeleteButton(){
    document.getElementById('deleteButton').addEventListener('click', function(event){
        const noteId = event.target.getAttribute('data-note-id');

        deleteNote(noteId);

        renderNotes();
    });
}


function deleteNote(noteId) {
    // Use NeDB's remove function to delete the note with the given id
    db.remove({ _id: noteId }, {}, function (err, numRemoved) {
      if (err) {
        console.error('Error deleting note:', err);
      } else {
        console.log(`Deleted ${numRemoved} note(s) with id ${noteId}`);
      }
    });
  }

setUpDeleteButton();