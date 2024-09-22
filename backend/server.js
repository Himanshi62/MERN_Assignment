const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./models/Student');
const Consultant = require('./models/Consultant');
const University = require('./models/University');


const app = express();
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

// connecting mongodb atlas
mongoose.connect('mongodb+srv://himanshiiitbombay62:tMsKNzEHse91YJFv@assignment.kvaxx.mongodb.net/?retryWrites=true&w=majority&appName=Assignment', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// POST route to add a new student
app.post('/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).send(student);
    } catch (error) {
        console.error('Error saving student:', error);
        res.status(400).send(error); 
    }
});

// POST route to add a new consultant
app.post('/consultants', async (req, res) => {
    const consultant = new Consultant(req.body);
    try {
        await consultant.save();
        res.status(201).send(consultant);
    } catch (error) {
        res.status(400).send(error);
    }
});
// get route to fetch the consultants data
app.get('/consultants', async (req, res) => {
    try {
        const consultants = await Consultant.find();
        res.status(200).send(consultants);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching consultants', error });
    }
});


// POST route to add a new university
app.post('/universities', async (req, res) => {
    const university = new University(req.body);
    try {
        await university.save();
        res.status(201).send(university);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET route to fetch all universities
app.get('/universities', async (req, res) => {
    try {
        const universities = await University.find();
        res.status(200).send(universities);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching universities', error });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
