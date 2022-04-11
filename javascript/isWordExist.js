export default function isWordExist(word){
	return new Promise(async (resolve, reject) => {
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
				'X-RapidAPI-Key': '75fb1b8b83msh889f6c57c02b66bp1c2c6fjsn9dd3b4fe8318'
			}
		};
		try{
			const wordInfo = await fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}/typeOf`, options)
			resolve(true)	
		}catch(err){
			reject(false)
		}
	})
}