import { Tile } from "./Tile.js"


const $field = document.getElementById("game_field")

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

console.log(initTiles)