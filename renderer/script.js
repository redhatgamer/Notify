let{ipcRenderer} = require('electron')

let title = document.getElementById('title')

let note = document.getElementById('note')

let btn = document.getElementById('btn')

btn.onclick = () => {
    if(title !== "" && note !== ""){
        let _note = { note, title}

        ipcRenderer.send('save_note', _note);
    }else{
        window.alert("please fill all the things and try again")
    }
}