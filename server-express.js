import express from 'express';
import { products } from './products.js';

const app = express();

app.get('/', (req,res)=>{
    res.send ("Mi primer server con express")
})

app.get('/products',(req,res)=>{
    res.send(products) 
    // res.json(products) //Misma respuesta
})

const PORT = 8080;

app.listen(PORT, ()=> console.log(`Server ok on port ${PORT}`))