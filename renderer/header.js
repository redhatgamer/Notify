
var dt = new Date();
var month = dt.toLocaleString('default', { month: 'long' }); 
var day = dt.getDate(); 
var hours = dt.getHours(); 
var minutes = dt.getMinutes(); 
var ampm = hours >= 12 ? 'PM' : 'AM'; 
hours = hours % 12; 
hours = hours ? hours : 12;

// Separate date and time
var currentDate = month + ' ' + day + '';
var currentTime = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;

document.getElementById('current-date').innerHTML = currentDate;
document.getElementById('current-time').innerHTML = currentTime;
