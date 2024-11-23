let url = 'json/productos.json'
let resConteiner = document.getElementById('result')
//asignar evento a cada boton
document.querySelectorAll('button[data-categoria]').forEach(boton => {
	boton.addEventListener('click', () => {
		const categoria = boton.getAttribute('data-categoria')
		search(categoria)
	})
})

//funcion para obtener los productos filtrados
function search(categoria){
    fetch(url)
    .then(response => response.json())
	// .then(response => console.log(response))
	.then(response => response.filter(producto => producto.categoria === categoria))
    .then(response => displayProducts(response))
}
//funcion para mostrar los productos filtados
function displayProducts(product){
	resConteiner.innerHTML = ''
	if(product.length === 0){
		resConteiner.innerHTML = '<p>No se encontraron resultados</p>'
		return
	}

	product.forEach(element => {
		let card = document.createElement('div')
		card.classList.add('cartas')

		let imagePath = element.imagen
		let image = document.createElement('img')
		image.src = imagePath
		
		let title = document.createElement('p')
		title.textContent = element.titulo

		card.appendChild(image)
		card.appendChild(title)
		card.addEventListener('click', () => showDetails(element))
		resConteiner.appendChild(card)
	})
}
//funcion para mostrar detalles
function showDetails(producto){
	let modal = document.getElementById('modal')
	let detalles = document.getElementById('detalles')
	detalles.innerHTML = ''
	let imagePath = producto.imagen
	let image = document.createElement('img')
	image.src = imagePath

	let title = document.createElement('h2')
	title.textContent = producto.titulo

	let descripcion = document.createElement('p')
	descripcion.textContent = producto.descripcion

	let precio = document.createElement('p')
	precio.textContent = 'USD $'+producto.precio

	let div = document.createElement('div')
	div.classList.add('contenido')

	div.appendChild(title)
	div.appendChild(descripcion)
	div.appendChild(precio)
	detalles.appendChild(image)
	detalles.appendChild(div)
	modal.style.display = 'block'
}

document.querySelector('.close').addEventListener('click',()=>{
	document.getElementById('modal').style.display = 'none'
})