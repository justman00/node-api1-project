const shortid = require('shortid')
const server = require('./api/server');
const express = require('express')

const app = express();
const PORT = 5000;


let object = [
    {
        id: shortid.generate(), // String, hint: use the installed `shortid` npm package to generate it
        name: "Jane Doe",  // String, required
        bio: "Having fun", // String, required
    }
]

// START YOUR SERVER HERE
app.get('/',(req,res)=>{
    res.send('<h1>hello world</h1>');
});


app.get('/api/users',(req,res)=>{
    res.json({object});
});

app.post('/api/users', express.json() ,(req,res)=>{
    const newObject = req.body;
    object.push(newObject);
    res.status(201).json({status: 'OK'}); 
});

app.post('/api/users/:id', express.json() ,(req,res)=>{
    object.push({...object , id: shortid.generate()});
    res.status(201).json({status: 'OK'}); 
});

app.put('/api/users/:id', express.json() ,(req,res)=>{
    const editedObject = req.body;
    object = object.map((el)=>{
        if(el.id === editedObject.id){
            return {...editedObject};
        } 
        return el; 
    });
    res.status(200).json({object}); 
}); 

app.delete('/api/users/:id', express.json() ,(req,res)=>{
    object=object.filter(el=> {
        return el.id !== req.params.id
    })
    res.status(200).json({object});
});



app.listen(PORT,()=>{
    console.log(`web servel is live at port ${PORT}...`);   
})    