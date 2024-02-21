import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const API_URl = "https://www.dnd5eapi.co/api/";
var classChosen = "";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.post("/get-classes", async(req,res)=>{
    try {
        const result = await axios.get(API_URl + "classes");
        console.log(result.data.results);
        res.render("index.ejs",{classes: result.data.results});
    } catch (error) {
        console.log(error);
    }
});

app.post('/chosen-class',(req,res) =>{
classChosen = req.body.class;
res.render("index.ejs",{chosenClass: classChosen})
});

app.post("/get-skills", async(req,res)=>{
    try {
        const result = await axios.get(API_URl + "spells");
        console.log(result.data.results);
        res.render("index.ejs",{listSkills: result.data.results});
    } catch (error) {
        console.log(error);
    }
});

app.listen(port,()=>{
    console.log('Running on port ' + port);
});