function switchBlock() {
  document.getElementsByClassName('block-one')[0].classList.add('hidden');
  document.getElementsByClassName('block-two')[0].classList.remove('hidden');
}

function selectSize(obj) {
  let buttons = document.querySelectorAll('.size-option button')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('selected')
  }
  obj.classList.add('selected')
}