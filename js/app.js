function switchBlock() {
  let bill = document.querySelector('.month input').value
  // Calculating the original system size
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
  // The price based on the recommended system size
  let panelPrice = sysSize*4000
  // Fill in the panel
  fillPanel(sizeOption, sysSize, panelPrice)
  // Show the recommendation
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

  calculateTotalPrice()
}

function fillPanel(sizeOption, sysSize, price) {
  document.querySelector('.recommend-info .title').innerHTML = `${sizeOption} system size solar panel for ${sysSize}kw`
  document.querySelector('.recommend-info .price').innerHTML = `$${price}`
  
  let className = `.size-option .${sizeOption.charAt(0).toLowerCase()}`
  document.querySelector(className).classList.add('selected')
  document.querySelector('.roof .module').style['background-image'] = `url(./img/${sizeOption.charAt(0).toLowerCase()}.png)`
  document.querySelector('.roof .module').style.opacity = 1

  // Calculating the total price
  calculateTotalPrice()
}

let addPowerwall = false

function togglePowerwall() {
  let status = document.querySelector('.store-energy button').innerHTML
  if (status === 'Add') {
    addPowerwall = true
    document.querySelector('.store-energy button').innerHTML = 'Remove'
  } else {
    addPowerwall = false
    document.querySelector('.store-energy button').innerHTML = 'Add'
  }
  calculateTotalPrice()
}

function calculateTotalPrice() {
  let panelPrice = parseInt(document.querySelector('.recommend-info .price').innerHTML.slice(1))
  
  let powerwallNum = document.querySelector('.store-energy select').value
  let powerPrice = 10000
  if (powerwallNum == 2) {
    powerPrice = 18000
  }

  let beforeTaxPrice = panelPrice + (addPowerwall ? powerPrice : 0)
  let fedTaxPrice = 0.26*beforeTaxPrice
  let totalPrice = beforeTaxPrice - fedTaxPrice

  document.querySelector('.price-detail .solar .price').innerHTML = `$${panelPrice}`
  document.querySelector('.price-detail .tax .price').innerHTML = `-$${fedTaxPrice}`
  document.querySelector('.price-detail .total .price').innerHTML = `$${totalPrice}`
}

function changeOption() {
  let powerwallNum = document.querySelector('.store-energy select').value
  let powerPrice = 10000
  if (powerwallNum == 2) {
    powerPrice = 18000
  }
  document.querySelector('.store-energy .price').innerHTML = `$${powerPrice}`
}