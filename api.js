const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const {check, validationResult} = require('express-validator');
const { Console } = require('console');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


let adressbok = [{
    id:1,
    name:"Mårten",
    email:"marten@dev.se"
}];

app.post('/person',
    [
        check('name').notEmpty().withMessage('Name is required.'),
        check('email').isEmail().withMessage('enter a valid email.')
    ],(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    };

    const newPerson = {
        id:adressbok.length+1,
        name: req.body.name,
        email: req.body.email,
    };
    adressbok.push(newPerson);
    res.status(201).json(newPerson);
});

app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
});

app.get('/person/:id',(req, res)=>{
    const personID = parseInt(req.params.id);
    const person =  adressbok.find(p => p.id ===personID)

    if(!person){
        return res.status(404).json({message: 'the person could not be found'})
    };

    res.json(person)
});

app.get('/person',(req, res)=>{
    res.json(adressbok)
});

app.patch('/person/:id',[
    check('name').optional().notEmpty().withMessage('Name is required.'),
    check('email').optional().isEmail().withMessage('enter a valid email.'),
],(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    };
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
    if(personIndex===-1){
        return res.status(404).json({message: 'the person could not be found'})
    };
    const name = adressbok[personIndex].name
    adressbok.splice(personIndex,1);
    res.json({message: `${name} have been removed.`})
});

app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`)
});