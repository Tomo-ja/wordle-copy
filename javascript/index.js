import { Tile } from "./Tile.js"
import getNewWord from "./getNewWord.js";

const $field = document.getElementById("game_field")

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
		//if it's letter, here
	}else if(e.keyCode === 13){
		console.log("pressed enter")
	}else if(e.keyCode === 8){
		console.log("delete is pressed")
	}
})

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
			console.log(tilesObject)
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
const changeTileValue = (value)=>{
	const targetDomTile = checkTargetDom(currentRow, currentColum)
	const targetObjectTile = tilesObject[`row${currentRow}`][currentColum]
	if(value === "submit"){
		currentColum = 0
	}else if(value === "delete"){
		if(targetObjectTile.guessLetter === undefined){
			currentColum -= 2
		}
		currentColum -= 1
		deleteValue()
	}else{
		targetObjectTile.putGuessLetter(value)
		targetDomTile.innerText = value
		currentColum += 1
	}
}
const deleteValue = ()=>{
	const targetDomTile = checkTargetDom(currentRow, currentColum)
	const targetObjectTile = tilesObject[`row${currentRow}`][currentColum]
	targetObjectTile.putGuessLetter("")
	targetDomTile.innerText = ""
}

initGame()
