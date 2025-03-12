
var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')

var colors = ['red', 'blue', 'pink', 'black', 'yellow', 'green']
var score = 0
var isGameStarted = false

$gameTime.addEventListener('input', setGameTime)
$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)

function handleBoxClick(event) {
    if (!isGameStarted) {
        return
    }

    if (event.target.dataset.box) { //created in game box clicked
        score++
        renderBox()
    }
}

function startGame() {
    isGameStarted = true
    score = 0
    $gameTime.setAttribute('disabled', 'true')
    setGameTime()

    $start.classList.add('hide')//add class to hide button start game
    /* $start.style.display = 'none' */
    $game.style.backgroundColor = "#fff"

    var interval = setInterval(function () {//interval (time of our game)
        var time = parseFloat($time.textContent)//parse/convert to float
        if (time <= 0) {
            clearInterval(interval)//stop interval if no time left
            endGame()
        }
        else {
            $time.textContent = (time - 0.1).toFixed(1)//convert span to show number with 1 digit after .
        }
    }, 100)//100 milisecs
    renderBox()
}
function setGameTime() {
    var time = parseInt($gameTime.value)
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}
function show($el) {
    $el.classList.remove('hide')
}
function hide($el) {
    $el.classList.add('hide')
}
function setGameScore() {
    $result.textContent = score.toString()
}

function endGame() {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    show($start)
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resultHeader)
}

function renderBox() {
    $game.innerHTML = ''//clear every time we launch new game
    var box = document.createElement('div')//we create boxes in #game
    var boxSize = getRandom(30, 100)
    var gameSize = $game.getBoundingClientRect()//get all attributes of #game
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize


    var randomColorIndex = getRandom(0, colors.length)
    //design our boxes
    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = colors[randomColorIndex]
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)//insert box in #game
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)//count random
}




