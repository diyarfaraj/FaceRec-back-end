const Clarifai = require('Clarifai'); 

const app = new Clarifai.App({
 apiKey: '202f31bde8044b048f30f82643d91da8'
});


const handleApiCall = (req, res) => {


 app.models
  .predict(
    Clarifai.FACE_DETECT_MODEL, 
    req.body.input)
  .then(data => {
  	res.json(data);
  })
    .catch(err => res.status(400).json('Kan ej jobba med API'))

}

const handleImage = (req, res, db) => {
	const {id} = req.body;

  db('users').where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries => {
  		res.json(entries[0]);
  	})

  	.catch(err => res.status(400).json('Fel vid hämtning av poäng'))
}

module.exports = {
	handleImage,
	handleApiCall
}