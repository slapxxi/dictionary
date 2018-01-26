function openModal() {
  return { type: 'OPEN_MODAL' };
}

function closeModal() {
  return { type: 'CLOSE_MODAL' };
}

export { openModal, closeModal };
