import modal from './modal.js'

const doubleCheckModal = modal()

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalConfirmButton = document.querySelector('.modal button')

const handleActionsQuestionsClick = (event, check = true) => { 
  event.preventDefault()

  const modalForm = document.querySelector('.modal form')
  const roomId = document.getElementById('room-id').dataset.id
  const questionId = event.target.dataset.id
  const actionForm = check ? 'check' : 'delete'

  modalForm.setAttribute('action', `/question/${roomId}/${questionId}/${actionForm}`)

  modalTitle.textContent = check ? 'Marcar pergunta como lida' : 'Excluir pergunta'
  modalDescription.textContent = `Tem certeza que você deseja ${check ? 'marcar a pergunta como lida' : 'excluir esta pergunta?'}?`
  modalConfirmButton.textContent = `Sim, ${check ? 'marcar como lida' : 'excluir'}`

  check ? modalConfirmButton.classList.remove('red') : modalConfirmButton.classList.add('red')

  doubleCheckModal.open()
}

const allCheckButtons = document.querySelectorAll('.actions a.check')

allCheckButtons.forEach(checkButton => {

  checkButton.addEventListener('click', handleActionsQuestionsClick)
})

const allDeleteButtons = document.querySelectorAll('.actions a.delete')

allDeleteButtons.forEach(deleteButton => {

  deleteButton.addEventListener('click', event => handleActionsQuestionsClick(event, false))
})

const modalCancelButton = document.querySelector('.button.cancel')

modalCancelButton.addEventListener('click', () => {
  doubleCheckModal.close()
})

const copyButton = document.getElementById('room-id-copy')

const copy = () => {

  const texToToCopy = copyButton.innerText.split('#')[1] 

  const tempInput = document.createElement('INPUT')
  tempInput.value = texToToCopy
  document.body.appendChild(tempInput)
  tempInput.select()
  document.execCommand('copy')
  tempInput.remove()

  const tooltipSpan = document.createElement('SPAN')
  tooltipSpan.textContent = 'Número da sala copiado'
  tooltipSpan.classList.add('copy-tooltip__text')
  copyButton.appendChild(tooltipSpan)

  setTimeout(() => {
    tooltipSpan.remove()
  }, 3000)

}

copyButton.addEventListener('click', copy)
