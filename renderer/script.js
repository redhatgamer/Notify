const { ipcRenderer } = require('electron');

let notes = [];

let list = document.getElementById("list")

function loadNotes(){
    list.innerHTML = "";
    notes.forEach((note, idx) => {
        list.innerHTML += `
            <div class="list-ele">
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
