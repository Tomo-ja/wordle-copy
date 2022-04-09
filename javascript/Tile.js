export class Tile {
	constructor(colum, row, answer){
		this.positionCol = colum,
		this.positionRow = row,
		this.answerLetter = answer,
		this.guessLetter = "",
		this.backGroundColor = "#121213"
		this.isCheckedAnswer = false
	}

	createDomElement(){
		const $textBox = document.createElement("div")
		$textBox.classList.add("game-tile", `game-tile_row-${this.positionRow}`)
		$textBox.innerText = this.guessLetter
		return $textBox
	}

	putGuessLetter(letter, number){
		if(number === this.positionCol){
			this.guessLetter = letter
		}
	}

	checkAnswer(answerArray){
		this.isCheckedAnswer = true
		if (this.answerLetter === this.guessLetter){
			this.backGroundColor = "#538D4E"
			return "match"
		}
		const partOfAnswer = answerArray.find(letter => letter === this.guessLetter)
		if(partOfAnswer){
			this.backGroundColor = "#B69F3B"
			return "partOf"
		}
		this.backGroundColor = "#3A3A3C"
		return "nonMatch"
	}
}

//Object.observe