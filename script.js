const showDataBtn = document.getElementById('showDataBtn');
showDataBtn.addEventListener('click', function() {
  const selectedDate = document.getElementById('datepicker').value;
  const currentData = data.find(obj => obj.Date === selectedDate);
  if (currentData) {
    // Create a dialog box to display the data
    const dialog = document.createElement('dialog');
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.addEventListener('click', function() {
      dialog.close();
    });
    dialog.appendChild(closeBtn);
    Object.keys(currentData).forEach(key => {
      if (key !== 'Date') {
        let value = currentData[key];
        if (key === 'HW1') {
          key = 'Eerste Hoogwater';
          value += ' hr';
        } else if (key === 'HW2') {
          key = 'Tweede Hoogwater';
          value += ' hr';
        } else if (key === 'LW1') {
          key = 'Eerste Laagwater';
          value += ' hr';
        } else if (key === 'LW2') {
          key = 'Tweede Laagwater';
          value += ' hr';
        } else if (key === 'm TAW' || key === 'm TAW__1' || key === 'm TAW__2' || key === 'm TAW__3') {
          key = 'm TAW';
          value += ' mtr';
        }
        const listItem = document.createElement('li');
        listItem.textContent = `${key}: ${value}`;
        dialog.appendChild(listItem);
        dialog.appendChild(document.createElement('br')); // Insert a line break after each list item
      }
    });
    document.body.appendChild(dialog);
    dialog.showModal();
  } else {
    alert('No data available for the selected date');
  }
});
