const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let adressbok = [{
    id:1,
    name:"Mårten",
    email:"marten@dev.se"
}];

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
    const person =  adressbok.findIndex(p => p.id ===personID)

    if(!person){
        return res.status(404).json({message: 'the person could not be found'})
    };

    adressbok[person].name = req.body.name || adressbok[person].name;
    adressbok[person].email = req.body.email || adressbok[person].email;

    res.json(adressbok[person]);
});

app.delete('/person/:id',(req, res)=>{
    const personID = parseInt(req.params.id);
    const personIndex =  adressbok.findIndex(p => p.id ===personID)

    if(!personIndex){
        return res.status(404).json({message: 'the person could not be found'})
    };
    const name = adressbok[personIndex].name
    adressbok.splice(personIndex,1);
    res.json({message: `${name} have been removed.`})
});

app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`)
});