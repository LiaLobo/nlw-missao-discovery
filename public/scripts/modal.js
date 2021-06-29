const modal = () => {

  const elementModalWrapper = document.querySelector('.modal-wrapper')
  const open = () => {
    elementModalWrapper.classList.add('active')
  }

  const close = () => {
    elementModalWrapper.classList.remove('active')
  }

  return {
    open,
    close,
  }
}

export default modal
