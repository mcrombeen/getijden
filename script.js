// Fetch the data from the JSON file
fetch('Antwerpen_Februari.json')
  .then(response => response.json())
  .then(data => {
    // Find the current date in the data
    const currentDate = new Date().toLocaleDateString();
    const currentData = data.find(obj => obj.Date === currentDate);

    // Update the date element
    const dateElement = document.getElementById('date');
    dateElement.textContent = currentDate;

    // Update the data elements
    const dataElement = document.getElementById('data');
    Object.keys(currentData).forEach(key => {
      if (key !== 'Date') {
        let value = currentData[key];
        if (key.match(/^(HW1)))
          key += 'Eerste Hoogwater';
          value += ' hr';
        } else {
          value += ' mtr';
        }
        const listItem = document.createElement('li');
        listItem.textContent = `${key}: ${value}`;
        dataElement.appendChild(listItem);
        dataElement.appendChild(document.createElement('br')); // Insert a line break after each list item
      }
    });
  })
  .catch(error => console.error(error));
