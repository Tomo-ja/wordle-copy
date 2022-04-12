export default function getNewWord(){
	return new Promise(async (resolve) => {
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
				'X-RapidAPI-Key': '75fb1b8b83msh889f6c57c02b66bp1c2c6fjsn9dd3b4fe8318'
			}
		};
	
		const wordInfo = await fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true&lettersMin=5&lettersMax=5&partOfSpeech=verb ', options)
		const wordObject = await wordInfo.json()
		resolve(wordObject)
	})
}