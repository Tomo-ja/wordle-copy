import { Tile } from "./Tile.js"
import getNewWord from "./getNewWord.js";

const data = getNewWord()
data.then(res => console.log(res.word))
const $field = document.getElementById("game_field")

// add event on each key on screen when it's pressed
const keyBoardBtns = [...document.getElementsByClassName("key-board_key")]
keyBoardBtns.forEach(btn => {
	btn.addEventListener("click", (e)=>{
		e.preventDefault()
		console.log(e.currentTarget.getAttribute("data-key"))
	})
});

const initTiles = []
const answer = "teach"

let counter = 0
for(let row=0; row<6; row++){
	for(let col=0; col<5; col++){
		initTiles[counter] = new Tile(col, row, answer[col])
		counter ++
	}
}

initTiles.forEach(tile => {
	const $tileElement = tile.createDomElement()
	$field.appendChild($tileElement)
});
