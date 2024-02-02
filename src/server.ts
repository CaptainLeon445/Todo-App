import app from "./app"

const port:Number = 3000;

app.listen(port, ()=>{
    console.log(`Server is running on the port ${port}`)
})