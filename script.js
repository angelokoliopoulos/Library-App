const addBookBtn = document.querySelector(".addBookBtn");
let modal = document.querySelector(".modal");

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}
function outsideClick(e) {
  if (e.target === modal) {
    closeModal();
  }
}
addBookBtn.addEventListener("click", openModal);
window.addEventListener("click", outsideClick);
