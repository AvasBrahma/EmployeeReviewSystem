

  function openReviewPopup() {
    document.getElementById("overlay").style.display = "block";
}

function closeReviewPopup() {
    document.getElementById("overlay").style.display = "none";
}

function openReviewPopup(elementData) {
  var element = JSON.parse(elementData);
  console.log(element);
  // Set the values in the modal using JavaScript DOM manipulation
  document.getElementById('reviewername').value = element.reviewername;
  document.getElementById('performanceCriteria').value = element.performancecriteria;
  document.getElementById('feedback').value = element.feedback;
  document.getElementById('rating').value = element.rating;
  document.getElementById('reviewerid').value = element.reviewerid;
  document.getElementById('employeeid').value = element.employeeid;
  // Open the modal
  document.getElementById('overlay').style.display = 'block';
}

function openSubmitReview(elementData) {
  var element = JSON.parse(elementData);
  console.log(element);
  // Set the values in the modal using JavaScript DOM manipulation
  document.getElementById('employeeName').value = element.empname;
  document.getElementById('employeeid').value = element.employeeid;
  document.getElementById('overlay').style.display = 'block';
}



function openCreateReviewPopup() {
  document.getElementById("overlay").style.display = "block";
}

function closeCreateReviewPopup() {
  document.getElementById("overlay").style.display = "none";
}