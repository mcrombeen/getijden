// Add an event listener to the date picker
document.getElementById('datePicker').addEventListener('change', function() {
  // Get the selected date
  const selectedDate = this.value;

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  // Set up the request
  xhr.open('GET', `https://raw.githubusercontent.com/mcrombeen/getijden/main/Antwerpen_Februari.json?date=${selectedDate}`);
  // Handle the response
  xhr.onload = function() {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      // Update the date element
      const dateElement = document.getElementById('date');
      dateElement.textContent = selectedDate;
      // Update the data elements
      const dataElement = document.getElementById('data');
      dataElement.innerHTML = ""; // clear previous data
      Object.keys(data).forEach(key => {
        let value = data[key];
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
        else if (key === 'm TAW' || key === 'm TAW__1' || key === 'm TAW__2' || key === 'm TAW__3') {
          key = 'm TAW ';
          value += ' mtr';
        }
        const listItem = document.createElement('li');
        listItem.textContent = `${key}: ${value}`;
        dataElement.appendChild(listItem);
      });
    } else {
      console.error(`Failed to load data from Antwerpen_Februari.json?date=${selectedDate}`);
    }
  };
  // Send the request
  xhr.send();
});

