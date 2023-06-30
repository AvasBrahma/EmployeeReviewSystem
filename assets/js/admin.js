function openReviewPopup() {
    document.getElementById("overlay").style.display = "block";
}

function closeReviewPopup() {
    document.getElementById("overlay").style.display = "none";
}


const form = document.getElementById('userForm');
const tableBody = document.getElementById('tableBody');
const radioInputs = tableBody.querySelectorAll('input[type="radio"]');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const selectedCheckbox = tableBody.querySelector('input[type="checkbox"]:checked');

  if (selectedCheckbox) {
    const selectedRow = selectedCheckbox.closest('tr');
    const selectedUser = {
      id: selectedCheckbox.value,
      name: selectedRow.querySelector('td:nth-child(2)').innerText,
      email: selectedRow.querySelector('td:nth-child(3)').innerText,
      empname: selectedRow.querySelector('input[name="employeename"]').value,
      employeeid: selectedRow.querySelector('input[name="employeeid"]').value,
      reviewername: selectedRow.querySelector('input[name="reviewername"]').value
    };

    // Extract the first element from arrays
    const empname = selectedUser.empname[0];
    const employeeid = selectedUser.employeeid[0];
    const reviewername = selectedUser.reviewername[0];

    // Do something with the selected user
    console.log(selectedUser);

    // Set the form values
    form.elements['selectedUserId'].value = selectedUser.id;
    form.elements['empname'].value = empname;
    form.elements['employeeid'].value = employeeid;
    form.elements['reviewername'].value = reviewername;

    form.submit(); // Submit the form
  }
});
