function openReviewPopup() {
    document.getElementById("overlay").style.display = "block";
}

function closeReviewPopup() {
    document.getElementById("overlay").style.display = "none";
}


function openPopup() {
    document.getElementById('popup').style.display = 'flex';
  }

  // Close the popup
  function closePopup() {
    document.getElementById('popup').style.display = 'none';
  }

  // Handle delete action
  function deleteItem() {
    // Perform delete action here
    console.log('Item deleted');
    closePopup(); // Close the popup after deletion
  }