const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', async () => {
    let notes = await ipcRenderer.invoke('get_data');
    console.log(notes);
});

document.getElementById('btn').onclick = () => {
    let title = document.getElementById('title').value;
    let noteText = document.getElementById('note').value;

    if (title.trim() !== "" && noteText.trim() !== "") {
        let note = { title, note: noteText };
        ipcRenderer.send('save_note', note);
    } else {
        window.alert("Please fill in all the fields and try again.");
    }
};
