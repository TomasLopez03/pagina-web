document.getElementById('searchButton').addEventListener('click', search)

let url = 'https://api.escuelajs.co/api/v1/products'

// curl -X GET /path/to/api/v1/jobs/autocomplete?contains="software"
let result = document.getElementById('results')
function search(){
    let resultSearchInput = document.getElementById('searchInput').value

    fetch(url+resultSearchInput)
    .then(response => response.json())
	// .then(response => console.log(response))
    .then(response => displayCharacter(response))
}

function displayCharacter(character){
	result.innerHTML = ''

	if(character.length === 0){
		result.innerHTML = '<p>No se encontraron resultados</p>'
		return
	}

	character.forEach(element => {
		let conteiner = document.createElement('div')
		conteiner.classList.add('movie')

		let imagePath = element.images[0]
		let image = document.createElement('img')
		image.src = imagePath
		
		let name = document.createElement('h2')
		name.textContent = element.title

		let specie = document.createElement('p')
		specie.textContent = element.description

		let status = document.createElement('p')
		status.textContent = "$"+element.price

		conteiner.appendChild(image)
		conteiner.appendChild(name)
		conteiner.appendChild(specie)
		conteiner.appendChild(status)

		result.appendChild(conteiner)
	})
	
};