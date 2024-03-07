 // Add event listeners to the buttons
 document.getElementById('newNoteBtn').addEventListener('click', function() {
    alert('New Note button clicked!');
    // Add your logic here for creating a new note
});

document.getElementById('newTodoBtn').addEventListener('click', function() {
    // alert('New To-Do button clicked!');
    // // Add your logic here for creating a new to-do

    window.location.href = "reminder.html";
    

});

document.getElementById('newHomeBtn').addEventListener('click', function() {
    window.location.href = "index.html";
    // Add your logic here for creating a new notebook
});

document.getElementById('quitBtn').addEventListener('click', function() {
    const confirmed = confirm('Are you sure you want to quit?');
        
    if (confirmed) {
       window.close();
    } else {
        // User canceled the quit action
        alert('Quit action canceled.');
    }
});

document.getElementById('printBtn').addEventListener('click', function() {
    window.print();
});