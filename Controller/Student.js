const express = require("express");
const student = require("../models/studentInfo")
const router = express.Router();


//get student result screen
router.get("/resultcheck", (req, res) => {
    try {
        res.render("student/loginPage");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

//Obtain the data of students according to their Roll numbers.
router.post("/resultcheck", async (req, res) => {
    try {
        const { rollNo, dob } = req.body;
        const studentData = await student.findOne({ rollNo, dob });
        if (studentData) {
            if (studentData.score < 40) {
                res.render('student/resultPage', { studentresult: studentData, message: 'Failed!' });
            } else {
                res.render('student/resultPage', { studentresult: studentData, message: 'Congratulations! You have successfully passed the exam.' });
            }
        } else {
            res.render('student/loginPage', { message: "The Roll Number or Date of Birth provided is incorrect. Please try again." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;