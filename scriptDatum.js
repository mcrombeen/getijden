document.addEventListener('DOMContentLoaded', function() {
  const xhr = new XMLHttpRequest();
  const datePicker = document.getElementById('datepicker');
  xhr.open('GET', 'https://raw.githubusercontent.com/mcrombeen/getijden/main/Antwerpen.json');
  xhr.onload = function() {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      datePicker.addEventListener('input', function() {
        const selectedDate = new Date(datePicker.value).toLocaleDateString({month: 'long'});
        const currentData = data.find(obj => obj.Date === selectedDate);
        if (currentData) {
          const currentDay = new Date(datePicker.value).toLocaleDateString('nl-NL', {weekday: 'long'});
          const dateElement = document.getElementById('date');
          dateElement.textContent = currentDay + ' ' + selectedDate;
          const dataElement = document.getElementById('data');
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
              } else if (key === 'm TAW' || key.startsWith('m TAW_')) {
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
          console.error(`No data found for ${selectedDate}`);
        }
      });
    } else {
      console.error('Failed to load data from Antwerpen.json');
    }
  };
  xhr.send();
});







