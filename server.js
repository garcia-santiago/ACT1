const express = require('express')
const fs = require('fs')

const app = express()
const PORT = 3005

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

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

app.get('/error', function(req, res) {
    res.sendFile(__dirname + "/public/error.html");
  });

app.get('/descarga/:archivo', function(req, res) {
    const archivo = req.params.archivo;
    const path = './data/'
    const file = `id_${archivo}.txt`
    const pathFile = path+file
    res.download(pathFile)
});

app.post('/form2', (req, res)=>{
    try {
        const {id, nombre, apellido, titulo, autor, editorial, year} = req.body

        if(id=='' || nombre=='' || apellido=='' || titulo=='' || autor=='' || editorial=='' || year==''){
            res.redirect("/error");
        }
        else{
            const path = './data/'
            const file = `id_${id}.txt`
            const pathFile = path+file
            let ws = fs.createWriteStream(pathFile);
            ws.write(`Id: ${id}, Nombre: ${nombre}, Apellido: ${apellido}`);
            ws.write(`\nTitulo: ${titulo}, Editorial: ${editorial}, Autor: ${autor}, Año: ${year}`)
            ws.end() 
            res.redirect("/descarga/"+id);
        }

    } catch (error) {
        res.send(error)
        res.end()
    }

})

app.listen(PORT, () => console.log(`Escuchando en puerto: ${PORT}`))