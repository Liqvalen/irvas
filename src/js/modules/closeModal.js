function closeModal(modalSelector) {
    console.log(1);
    modalSelector.classList.add('hide')
    // modalSelector.classList.remove('show');
    document.body.style.overflow = '';
}
export default closeModal