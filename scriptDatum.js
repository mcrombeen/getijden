document.addEventListener("DOMContentLoaded", function() {
  const datePicker = document.getElementById('datePicker');
  datePicker.addEventListener('change', function() {
    const selectedDate = datePicker.value;
    const url = `https://raw.githubusercontent.com/mcrombeen/getijden/main/Antwerpen_${selectedDate}.json`;

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Set up the request
    xhr.open('GET', url);

    // Handle the response
    xhr.onload = function() {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);

        // Find the selected date in the data
        const currentDate = new Date(selectedDate).toLocaleDateString({month: 'long'});
        const currentDay = new Date(selectedDate).toLocaleDateString('nl-NL', {weekday: 'long'});
        const currentData = data.find(obj => obj.Date == currentDate);

        // Update the date element
        const dateElement = document.getElementById('date');
        dateElement.textContent = currentDay + (' ') + currentDate;

        // Update the data elements
        const dataElement = document.getElementById('data');
        dataElement.innerHTML = ""; // Clear the existing data
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
      } else {
        console.error(`Failed to load data from ${url}`);
      }
    };

    // Send the request
    xhr.send();
  });
});


