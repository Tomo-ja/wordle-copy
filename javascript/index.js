import { Tile } from "./Tile.js"
import getNewWord from "./getNewWord.js";

const $field = document.getElementById("game_field")

const tilesObject = {row1:[],row2:[],row3:[],row4:[],row5:[],row6:[]}
let answer = ""

let currentRow = 1
let currentColum = 1

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
		console.log(e.currentTarget.getAttribute("data-key"))
	})
});

document.addEventListener("keydown", (e)=>{
	if (64< e.keyCode && e.keyCode < 91){
		//if it's letter, here
		console.log(e.key)
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

initGame()
