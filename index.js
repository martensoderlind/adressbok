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
});

app.get('/',(req, res)=>{
    res.json(adressbok);
});

app.get('/person/:id',(req, res)=>{
    const personID = parseInt(req.params.id);
    const person =  adressbok.find(p => p.id ===personID)

    if(!person){
        return res.status(404).json({message: 'the person could not be found'})
    };

    res.json(person)
});

app.patch('/person/:id',(req, res)=>{
    const personID = parseInt(req.params.id);
    const person =  adressbok.find(p => p.id ===personID)

    if(!person){
        return res.status(404).json({message: 'the person could not be found'})
    };

    person.name = req.params.name || person.name;
    person.email = req.params.email || person.email;

    res.json(person);
});

app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`)
});