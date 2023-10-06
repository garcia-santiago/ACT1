const express = require('express')
const fs = require('fs')

const app = express()
const PORT = 3005

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('Prueba')
})

app.post('/form', (req, res)=>{
    
    const {nombre} = req.body
    const archivo = "./data/"+nombre+".txt"
/*     const writeStream = fs.createWriteStream(archivo);
    writeStream.write("Hi, JournalDEV Users. ");
    writeStream.write("Thank You.");
    writeStream.end(); */

    const file = `./data/AFAFA`;
    res.download(file); // Set disposition and send it.
    res.end()
})


app.post('/form2', (req, res)=>{
    try {
        const {id, nombre, apellido, titulo, autor, editorial, year} = req.body
        const path = './data/'
        const file = `id_${id}.txt`
        let ws = fs.createWriteStream(path+file);
        ws.write(`Id: ${id}, Nombre: ${nombre}, Apellido: ${apellido}`);
        ws.write(`\nTitulo: ${titulo}, Editorial: ${editorial}, Autor: ${autor}, Año: ${year}`)
        ws.end() 
        res.send('Ok')
        res.end()
    } catch (error) {
        res.send(error)
        res.end()
    }

})

app.listen(PORT, () => console.log(`Escuchando en puerto: ${PORT}`))