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

  const selectedCheckbox = tableBody.querySelector('input[type="radio"]:checked');

  console.log("Selected Employee :", selectedCheckbox);

  
  if (selectedCheckbox) {
    const selectedRow = selectedCheckbox.closest('tr');
    const selectedUserId = selectedCheckbox.value;
    const selectedUser = {
      id: selectedUserId,
      name: selectedRow.querySelector(`input[name="employeename_${selectedUserId}"]`).value,
      email: selectedRow.querySelector('td:nth-child(3)').innerText,
      empname: selectedRow.querySelector(`input[name="employeename_${selectedUserId}"]`).value,
      employeeid: selectedRow.querySelector(`input[name="employeeid_${selectedUserId}"]`).value,
      reviewername: selectedRow.querySelector(`input[name="reviewername_${selectedUserId}"]`).value
    };

    console.log("Selected Uuser :", selectedUser)

    // // Extract the first element from arrays
    // const empname = selectedUser.empname[0];
    // const employeeid = selectedUser.employeeid[0];
    // const reviewername = selectedUser.reviewername[0];
    // console.log("Name ", name);
  
    // Do something with the selected user
    console.log(selectedUser.empname);

// Set the form values
form.elements[`reviewerid_${selectedUser.id}`].checked = true;
form.elements[`employeename_${selectedUser.id}`].value = selectedUser.empname;
form.elements[`employeeid_${selectedUser.id}`].value = selectedUser.employeeid;
form.elements[`reviewername_${selectedUser.id}`].value = selectedUser.reviewername;


    form.submit(); // Submit the form
  }
});
