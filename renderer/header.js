
var dt = new Date();
var month = dt.toLocaleString('default', { month: 'long' }); // Get full month name
var day = dt.getDate(); // Get day of the month
var hours = dt.getHours(); // Get hours
var minutes = dt.getMinutes(); // Get minutes
var ampm = hours >= 12 ? 'PM' : 'AM'; // Determine if it's AM or PM
hours = hours % 12; // Convert to 12-hour format
hours = hours ? hours : 12; // Handle midnight (0 hours)

// Separate date and time
var currentDate = month + ' ' + day + 'th';
var currentTime = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;

document.getElementById('current-date').innerHTML = currentDate;
document.getElementById('current-time').innerHTML = currentTime;
