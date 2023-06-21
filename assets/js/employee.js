

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
  document.getElementById('employeeName').value = element.reviewername;
  document.getElementById('performanceCriteria').value = element.performancecriteria;
  document.getElementById('feedback').value = element.feedback;
  document.getElementById('rating').value = element.rating;
  
  // Open the modal
  document.getElementById('overlay').style.display = 'block';
}
