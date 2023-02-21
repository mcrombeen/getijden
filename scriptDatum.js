// Get the HTML elements
const dateInput = document.getElementById('date');
const dateElement = document.getElementById('date-display');
const dataElement = document.getElementById('data');

// Add an event listener to the date input
dateInput.addEventListener('change', function() {
  // Get the selected date value
  const selectedDate = dateInput.value;
  // Fetch the data for the selected date
  fetch(`https://raw.githubusercontent.com/mcrombeen/getijden/main/Antwerpen_${selectedDate}.json`)
    .then(response => response.json())
    .then(data => {
      // Find the selected date in the data
      const currentDate = new Date(selectedDate).toLocaleDateString({month: 'long'});
      const currentDay = new Date(selectedDate).toLocaleDateString('nl-NL', {weekday: 'long'});
      const currentData = data.find(obj => obj.Date == currentDate);
      // Update the date element
      dateElement.textContent = currentDay + (' ') + currentDate;
      // Clear the previous data elements
      dataElement.innerHTML = '';
      // Update the data elements
      Object.keys(currentData).forEach(key => {
        if (key !== 'Date') {
          let value = currentData[key];
          if (key === 'HW1') {
            key = 'Eerste Hoogwater ';
            value += ' hr';
          }
          else if (key === 'HW2') {
            key = 'Tweede Hoogwater ';
            value += ' hr';
          }
          else if (key === 'LW1') {
            key = 'Eerste Laagwater ';
            value += ' hr';
          }
          else if (key === 'LW2') {
            key = 'Tweede Laagwater ';
            value += ' hr';
          }
          else if (key === 'm TAW') {
            key = 'm TAW ';
            value += ' mtr';
          }
          else if (key === 'm TAW__1') {
            key = 'm TAW ';
            value += ' mtr';
          }
          else if (key === 'm TAW__2') {
            key = 'm TAW ';
            value += ' mtr';
          }
          else if (key === 'm TAW__3') {
            key = 'm TAW ';
            value += ' mtr';
          }
          const listItem = document.createElement('li');
          listItem.textContent = `${key}: ${value}`;
          dataElement.appendChild(listItem);
          dataElement.appendChild(document.createElement('br')); // Insert a line break after each list item
        }
      });
    })
    .catch(error => {
      console.error(`Failed to load data from Antwerpen_${selectedDate}.json`);
      console.error(error);
    });
});
