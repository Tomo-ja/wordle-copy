# Overview

<img src="/Preview.png" alt="Preview of the App">

My first user-interaction application which is created based on real game [Wordle]('https://www.nytimes.com/games/wordle/index.html')

⚠️ For security reason, deployment version on github page doesn't have api key. That is why the target word is always constant. If you wish you can modify it like below to get a random word.

```javascript
# /javascript/getNewWord.js
			const options = {
				method: 'GET',
				headers: {
					'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
					// TODO: find a way to access env local without backend
					'X-RapidAPI-Key': ${YOUR_API_KEY}
                 }
		    };
```

[Word api is here]('https://rapidapi.com/dpventures/api/wordsapi/')

## Motivation

I developed this web application to test my vanilla JavaScript skill. Without any framework, I can develop the small word game with a third party api.

Although the application is pretty straight forward, this application required me to have a strong knowledge of HTML, CSS, and JavaScript as well as how to interact with each other.

## Usage

This application is available on [github page]('https://tomo-ja.github.io/wordle-copy/')

or

```
git clone git@github.com:Tomo-ja/wordle-copy.git
```

## Language and Libraries

- HTML5
- CSS3
- Vanilla js
- [Words API]('https://rapidapi.com/dpventures/api/wordsapi/')

## Architecture

index.js is responsive for the game process including connect to html document, init game filed, and handle user action.

Tile.js is responsive for each tile component's behavior. Tile class generates a div element and contains all information as well as some method to check answers.

### Thank you for reading through all of this. I hope you find some fun :)
