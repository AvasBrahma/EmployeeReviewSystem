function openReviewPopup() {
    document.getElementById("overlay").style.display = "block";
}

function closeReviewPopup() {
    document.getElementById("overlay").style.display = "none";
}


const form = document.getElementById('userForm');
    const searchInput = document.getElementById('searchInput');
    const tableBody = document.getElementById('tableBody');

    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const selectedUsers = Array.from(form.elements['user[]'])
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

      // Do something with the selected user values
      console.log(selectedUsers);
    });

    searchInput.addEventListener('input', function() {
      const query = searchInput.value.toLowerCase();

      Array.from(tableBody.getElementsByTagName('tr')).forEach(row => {
        const name = row.getElementsByTagName('td')[1].innerText.toLowerCase();
        const email = row.getElementsByTagName('td')[2].innerText.toLowerCase();

        if (name.includes(query) || email.includes(query)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });