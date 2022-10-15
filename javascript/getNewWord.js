export default function getNewWord(){
	return new Promise(async (resolve) => {
		try{
			const options = {
				method: 'GET',
				headers: {
					'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
					// TODO: find a way to access env local without backend
					'X-RapidAPI-Key': process.env.X_RapidAPI_Key
				}
			};
		
			const wordInfo = await fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true&lettersMin=5&lettersMax=5&partOfSpeech=verb ', options)
			const wordObject = await wordInfo.json()
			resolve(wordObject)
		} catch {
			resolve({word: 'money'})
		}
	})
}