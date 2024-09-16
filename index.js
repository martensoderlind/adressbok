const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let adressbok = [];

app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`)
});