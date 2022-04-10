import { Tile } from "./Tile.js"
import getNewWord from "./getNewWord.js";

const $field = document.getElementById("game_field")

const initTiles = []
let answer = ""

// add event on each key on screen when it's pressed
const keyBoardBtns = [...document.getElementsByClassName("key-board_key")]
keyBoardBtns.forEach(btn => {
	btn.addEventListener("click", (e)=>{
		e.preventDefault()
		console.log(e.currentTarget.getAttribute("data-key"))
	})
});

document.addEventListener("keydown", (e)=>{
	console.log(e.key)
})

const initGame = () =>{
	getNewWord()
		.then(res => {
			answer = res.word
			let counter = 0
			for(let row=0; row<6; row++){
				for(let col=0; col<5; col++){
					initTiles[counter] =　new Proxy(new Tile(col, row, answer[col]), {}) 
					counter ++
				}
			}
		})
		.then(()=>{
			initTiles.forEach(tile => {
				const $tileElement = tile.createDomElement()
				$field.appendChild($tileElement)
			});
		})
}


initGame()
