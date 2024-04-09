const express = require("express");
const teacher = require("../models/studentInfo")
const router = express.Router();

// Page for teacher login.
router.get('/login', (req, res) => {
    res.render('teacher/loginPage');
});

// Upon successful login, teachers can access all the data.
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (username == "rms@gmail.com" && password == "Rms90arthak123@") {
            // set cookie for teacher 
            res.cookie('teacher', 'true');
            const data = await teacher.find();
            res.render('teacher/studentInfo', { students: data, success_message: "Login Successfully!" });
        }
        else {
            res.render('teacher/loginPage', { message: "The username or password provided is incorrect. Please attempt to login again." })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/logout', async (req, res) => {
    try {
        if (req.cookies.teacher == 'true') {
            //Delete the cookie associated with the teacher's login.
            res.clearCookie('teacher');
            res.render('main');
        }
        else {
            res.clearCookie('teacher');
            res.redirect('back');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//Retrieve the data of all students.
router.get('/allStudentData', async (req, res) => {
    try {
        if (req.cookies.teacher == 'true') {
            const allStudentData = await teacher.find();
            res.render('teacher/studentInfo', { students: allStudentData });
        } else {
            res.clearCookie('teacher');
            res.render('main');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//Interface for inputting student information.
router.get('/addStudent', (req, res) => {
    try {
        if (req.cookies.teacher == 'true')
            res.render('teacher/addStudentPage', { edit: 'false' })
        else {
            res.clearCookie('teacher');
            res.render('main');
        }
    }
    catch (error) {
        console.log(error)
        res.redirect('back');
    }
});

//Add student information.
router.post('/addRecord', async (req, res) => {
    const { name, rollNo, dob, score } = req.body;
    try {
        if (req.cookies.teacher == 'true') {
            const rollExist = await teacher.findOne({ rollNo });
            if (rollExist) {
                return res.render('teacher/addStudentPage', { message: "Roll Number is already present" });
            }
            await teacher.create(req.body);
            return res.redirect('/teacher/allStudentData');
        } else {
            res.clearCookie('teacher');
            res.render('main');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// update student details
router.get('/getEditDetail/:id', async (req, res) => {
    try {
        if (req.cookies.teacher == 'true') {
            const { id } = req.params;
            const studentData = await teacher.findById(id);
            res.render('teacher/editDetails', { edit: studentData });
        }
    }
    catch (error) {
        console.error(error);
        res.send(error);
    }
});

router.post('/editstudent', async (req, res) => {
    try {
        if (req.cookies.teacher == 'true') {
            const id = req.body.Id;
            delete (req.body.Id);
            if (!await teacher.findByIdAndUpdate(id, req.body)) {
                res.send('Student Data not found.');
                return;
            }
            res.redirect('/teacher/allStudentData');
        }
    } catch (error) {
        console.error(error);
    }
});

//delete student information.
router.get('/deleteRecord/:id', async (req, res) => {
    try {
        if (req.cookies.teacher == 'true') {
            await teacher.findByIdAndDelete(req.params.id)
            res.redirect('/teacher/allStudentData');
        }
        else {
            res.render('main');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;