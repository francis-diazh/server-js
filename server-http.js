import http from 'http';
import { products } from './products.js'

const server = http.createServer((req,res)=>{
    // res.end ("Mi primer server")
    if (req.url === '/products'){
        res.end (JSON.stringify(products))
    }
});

server.listen(8080,()=>{
    console.log("Listening on port 8080")
})

