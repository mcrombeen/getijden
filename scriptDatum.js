document.addEventListener('DOMContentLoaded', function() {
  const xhr = new XMLHttpRequest();
  const datePicker = document.getElementById('datepicker');
  datePicker.addEventListener('input', function() {
    const selectedDate = new Date(datePicker.value);
    const formattedDate = selectedDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'});
    xhr.open('GET', `https://raw.githubusercontent.com/mcrombeen/getijden/main/Antwerpen_${formattedDate}.json`);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        const currentDate = selectedDate.toLocaleDateString({month: 'long'});
        const currentDay = selectedDate.toLocaleDateString('nl-NL', {weekday: 'long'});
        const currentData = data.find(obj => obj.Date === formattedDate);
        const dateElement = document.getElementById('date');
        dateElement.textContent = currentDay + ' ' + currentDate;
        const dataElement = document.getElementById('data');
        dataElement.innerHTML = '';
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
            dataElement.appendChild(document.createElement('br'));
          }
        });
      } else {
        console.error(`Failed to load data from Antwerpen_${formattedDate}.json`);
      }
    };
    xhr.send();
    console.log(datePicker.value);
  });
});










