const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let adressbok = [];

app.post('/person',(req, res)=>{
    const newPerson = {
        id:adressbok.length+1,
        name: req.body.name,
        email: req.body.email,
    };
    adressbok.push(newPerson);
    res.status(201).json(newPerson);
})

app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`)
});