const express = require('express')
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');


var app = express()
const port = 7000;

// app.use(express.bodyParser());
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({extended : true })); 


// require('conn/db');

mongoose.connect("mongodb://localhost:27017/fooddelivery", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex:true
}).then(() => {
    console.log('connection successful');
}).catch((e) => {
    console.log('no connection')
    console.log(e);
})


const contactusshema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    
})

const Register = new mongoose.model("Customer", contactusshema)

app.use("/staticFiles", express.static('STATICFILES')); // For Serving static files

app.get('/', async function (req, res) {
    res.sendFile("foodDelivery.html", {
        root: path.join(__dirname, "./views")
    });
})

// app.get('/contactus', async function (req, res) {
//     res.sendFile("contactus.html", {
//         root: path.join(__dirname, "./views")
//     });
// })


app.post('/', async (req, res) => {
    try {
        // console.log(req.body.name)
        // res.send(req.body.name)
        const contactus = new Register({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        })
        const registered = await contactus.save();
        res.status(201).redirect("/")

    } catch (error) {
        res.status(400).send("Enter All Details Correctly.")
        // console.log(error)
    }
})

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});