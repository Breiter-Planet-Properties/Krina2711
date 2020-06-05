function switchBlock() {
  let bill = document.querySelector('.month input').value
  // Here is the formula of calculating the original system size
  let sysSize = Math.ceil((bill*12)/(0.2*1200))
  let moduleNum = 0
  let sizeOption = 'Small'
  // Recommended system size and number of module based on the original system size
  switch (true) {
    case sysSize <= 4:
      sysSize = 4
      moduleNum = 10
      sizeOption = 'Small'
      break
    case sysSize <= 8:
      sysSize = 8
      moduleNum = 20
      sizeOption = 'Medium'
      break
    case sysSize <= 12:
      sysSize = 12
      moduleNum = 30
      sizeOption = 'Large'
      break
    case sysSize > 12:
      sysSize = 16
      moduleNum = 40
      sizeOption = 'Extra large'
      break
  }
  // Here is the price based on the recommended system size
  let price = sysSize*4000
  // Fill in the panel
  fillPanel(sizeOption, sysSize, price)

  // Switch the panel
  document.getElementsByClassName('block-one')[0].classList.add('hidden');
  document.getElementsByClassName('block-two')[0].classList.remove('hidden');
}

function selectSize(obj) {
  let buttons = document.querySelectorAll('.size-option button')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('selected')
  }
  let sizeOption = obj.classList[1]
  let sysSize = 4
  switch (sizeOption) {
    case 's':
      sysSize = 4
      moduleNum = 10
      sizeOption = 'Small'
      break
    case 'm':
      sysSize = 8
      moduleNum = 20
      sizeOption = 'Medium'
      break
    case 'l':
      sysSize = 12
      moduleNum = 30
      sizeOption = 'Large'
      break
    case 'e':
      sysSize = 16
      moduleNum = 40
      sizeOption = 'Extra large'
      break
    }
  let price = sysSize*4000
  fillPanel(sizeOption, sysSize, price)
  obj.classList.add('selected')
}

function fillPanel(sizeOption, sysSize, price) {
  document.querySelector('.recommend-info .title').innerHTML = `${sizeOption} system size solar panel for ${sysSize}kw`
  document.querySelector('.recommend-info .price').innerHTML = `$${price}`
  let className = `.size-option .${sizeOption.charAt(0).toLowerCase()}`
  document.querySelector(className).classList.add('selected')
  // Show the recommendation
  document.querySelector('.roof .module').style['background-image'] = `url(./img/${sizeOption.charAt(0).toLowerCase()}.png)`
  document.querySelector('.roof .module').style.opacity = 1
}