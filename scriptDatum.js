window.onload = function() {
  const xhr = new XMLHttpRequest();
  const datePicker = document.getElementById('date-picker');
  const dateElement = document.getElementById('date');
  const dataElement = document.getElementById('data');

  datePicker.addEventListener('change', function() {
    xhr.open('GET', `https://raw.githubusercontent.com/mcrombeen/getijden/main/Antwerpen_${this.value}.json`);

    xhr.onload = function() {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        const currentDate = new Date(this.value).toLocaleDateString({month: 'long'});
        const currentDay = new Date(this.value).toLocaleDateString('nl-NL', {weekday: 'long'});
        const currentData = data.find(obj => obj.Date == currentDate);

        dateElement.textContent = currentDay + (' ') + currentDate;

        dataElement.innerHTML = '';

        Object.keys(currentData).forEach(key => {
          if (key !== 'Date') {
            let value = currentData[key];

            if (key === 'HW1') {
              key = 'Eerste Hoogwater ';
              value += ' hr';
            } else if (key === 'HW2') {
              key = 'Tweede Hoogwater ';
              value += ' hr';
            } else if (key === 'LW1') {
              key = 'Eerste Laagwater ';
              value += ' hr';
            } else if (key === 'LW2') {
              key = 'Tweede Laagwater ';
              value += ' hr';
            } else if (key === 'm TAW' || key === 'm TAW__1' || key === 'm TAW__2' || key === 'm TAW__3') {
              key = 'm TAW ';
              value += ' mtr';
            }

            const listItem = document.createElement('li');
            listItem.textContent = `${key}: ${value}`;
            dataElement.appendChild(listItem);
            dataElement.appendChild(document.createElement('br'));
          }
        });
      } else {
        console.error('Failed to load data from Antwerpen_Februari.json');
      }
    };

    xhr.send();
  });
};





