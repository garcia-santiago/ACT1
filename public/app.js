const form = document.querySelector('form');




form.addEventListener('submit', async event => {
    event.preventDefault();

    const id = document.getElementById('id').value
    const nombre = document.getElementById('nombre').value
    const apellido = document.getElementById('apellido').value
    const titulo = document.getElementById('titulo').value
    const autor = document.getElementById('autor').value
    const editorial = document.getElementById('editorial').value
    const year = document.getElementById('year').value

    axios.post('http://localhost:3005/form2', {id, nombre, apellido, titulo, autor, editorial, year})
    .then(res =>{
        console.log(res);
    })
  });