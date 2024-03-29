import { Tile } from "./Tile.js"
import getNewWord from "./getNewWord.js";
import isWordExist from "./isWordExist.js";
import makeConfetti from "./confetti.js";

const $field = document.getElementById("game_field")
const $result = document.getElementById("result")
const $result_answer = document.getElementById("result_answer")
const $result_title = document.getElementById("result_title")

const tilesObject = {row1:[],row2:[],row3:[],row4:[],row5:[],row6:[]}
let answer = ""

let currentRow = 1
let currentColum = 0

let domTilesInRow1 = []
let domTilesInRow2 = []
let domTilesInRow3 = []
let domTilesInRow4 = []
let domTilesInRow5 = []
let domTilesInRow6 = []

const initGame = () =>{
	getNewWord()
		.then(res => {
			answer = res.word
			let counter = 0
			for(let row=1; row<7; row++){
				for(let col=0; col<5; col++){
					tilesObject[`row${row}`].push(new Tile(col, row, answer[col]))
					counter ++
				}
			}
		})
		.then(()=>{
			for(let i=1; i<7;i++){
				tilesObject[`row${i}`].forEach(tile=>{
					const $tileElement = tile.createDomElement()
					$field.appendChild($tileElement)
				})
			}
		}).then(()=>{
			domTilesInRow1 = [...document.getElementsByClassName("game-tile_row-1")]
			domTilesInRow2 = [...document.getElementsByClassName("game-tile_row-2")]
			domTilesInRow3 = [...document.getElementsByClassName("game-tile_row-3")]
			domTilesInRow4 = [...document.getElementsByClassName("game-tile_row-4")]
			domTilesInRow5 = [...document.getElementsByClassName("game-tile_row-5")]
			domTilesInRow6 = [...document.getElementsByClassName("game-tile_row-6")]
		})
}

const checkTargetDom = (row, col)=>{
	const targetRow = checkTargetRow(row)
	const targetTile = targetRow[col]
	return targetTile
}
const checkTargetRow = (row)=>{
	switch (row) {
		case 1:
			return domTilesInRow1
		case 2:
			return domTilesInRow2
		case 3:
			return domTilesInRow3
		case 4:
			return domTilesInRow4
		case 5:
			return domTilesInRow5
		case 6:
			return domTilesInRow6
		default:
			break;
	}
}
const checkTargetObject = (row)=>{
	switch (row){
		case 1:
			return tilesObject.row1
		case 2:
			return tilesObject.row2
		case 3:
			return tilesObject.row3
		case 4:
			return tilesObject.row4
		case 5:
			return tilesObject.row5
		case 6:
			return tilesObject.row6
		}
}
const changeTileValue = (value)=>{
	const targetDomTile = checkTargetDom(currentRow, currentColum)
	const targetObjectTile = tilesObject[`row${currentRow}`][currentColum]
	if(value === "submit"){
		submitValue()
	}else if(value === "delete"){
		if(!targetObjectTile){
			;
		}else if(targetObjectTile.guessLetter === undefined){
			currentColum = currentColum === 0 ? 0 : currentColum -2
		}
		currentColum = currentColum === 0 ? 0 : currentColum -1
		deleteValue()
	}else{
		targetObjectTile.putGuessLetter(value)
		targetDomTile.innerText = value
		currentColum = currentColum === 5 ? 5 : currentColum + 1
	}
}
const deleteValue = ()=>{
	const targetDomTile = checkTargetDom(currentRow, currentColum)
	const targetObjectTile = tilesObject[`row${currentRow}`][currentColum]
	targetObjectTile.putGuessLetter("")
	targetDomTile.innerText = ""
}
const submitValue = async()=>{
	const answerArray = checkTargetObject(currentRow)
	const targetDomArray = checkTargetRow(currentRow)
	const userAnswer = `${answerArray[0].guessLetter}${answerArray[1].guessLetter}${answerArray[2].guessLetter}${answerArray[3].guessLetter}${answerArray[4].guessLetter}`
	isWordExist(userAnswer)
		.then(res=>{
			if(res){
				identifyAnswer(answerArray, targetDomArray)
				currentRow += 1
				currentColum = 0
			}else{
				popUpNoExist()
			}
		}).then(()=>{
			if(currentRow === 7){
				displayResult("Out of chance :(", false)
			}
		})
}
const popUpNoExist = ()=>{
	const $popUp = document.createElement("div")
	$popUp.className = "game_pop-up"
	$popUp.innerText = "Couldn't find that word"
	$field.appendChild($popUp)
	setTimeout(()=>{
		$field.removeChild($popUp)
	}, 2000)
}
const identifyAnswer = (objectArray, domArray)=>{
	let matchLetter = 0
	objectArray.forEach((tile, index) =>{
		const isLetterInclude = tile.checkAnswer(answer)
		matchLetter = changeKeyboard(isLetterInclude, tile.guessLetter) ? matchLetter + 1 : matchLetter
		domArray[index].style.backgroundColor = tile.backgroundColor
	})
	if(matchLetter === 5){
		displayResult("Congratulation", true)
	}
}

const changeKeyboard = (result, letter)=>{
	const $targetKey = document.querySelector(`[data-key="${letter}"]`)
	let isMatch = false
	switch(result){
		case "match":
			$targetKey.style.backgroundColor = "#538D4E"
			isMatch = true
			break
		case "partOf":
			$targetKey.style.backgroundColor = "#B49F3A"
			break
		case "nonMatch":
			$targetKey.style.backgroundColor = "#3A3A3C"
			break
	}
	return isMatch
}
const displayResult = (text, userWin)=>{
	$result_title.innerText = text
	$result_answer.innerText = answer
	$result.style.display = "block"
	if(userWin){
		makeConfetti()
	}
}

// add event on each key on screen when it's pressed
const keyBoardBtns = [...document.getElementsByClassName("key-board_key")]
keyBoardBtns.forEach(btn => {
	btn.addEventListener("click", (e)=>{
		e.preventDefault()
		const value = e.currentTarget.getAttribute("data-key")
		changeTileValue(value)
	})
});

document.addEventListener("keydown", (e)=>{
	if (64< e.keyCode && e.keyCode < 91){
		changeTileValue(e.key)
	}else if(e.keyCode === 13){
		changeTileValue("submit")
	}else if(e.keyCode === 8){
		changeTileValue("delete")
	}
})

const tryAgainBtn = document.getElementById("result_try-again")
tryAgainBtn.addEventListener("click", ()=>{
	window.location.reload()
})

initGame()
