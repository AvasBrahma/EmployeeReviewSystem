function openReviewPopup() {
    document.getElementById("overlay").style.display = "block";
}

function closeReviewPopup() {
    document.getElementById("overlay").style.display = "none";
}

document.getElementById("addNewButton").addEventListener("click", function() {
    var myModal = new bootstrap.Modal(document.getElementById('createUserModal'));
    myModal.show();
});


