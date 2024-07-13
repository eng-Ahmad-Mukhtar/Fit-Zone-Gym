const express = require('express');
const Application = express();
const http = require('http');
const server = http.createServer(Application);

const bodyParser = require('body-parser');


Application.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config();
const port = process.env.PORT || 5050

Application.set('view engine', "ejs");
Application.use(express.static("public"));
Application.use(express.static("uploads"));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        server.listen(port, () => {
            console.log(`Application runing on http://localhost:${port}/Home`);

        })
    }).catch((err) => {
        console.log(err);
    });

Application.use(express.urlencoded({ extended: false }));
Application.use(express.json());



const session = require('express-session');
const { SESSION_SECRET } = process.env;
Application.use(
    session({
        secret: SESSION_SECRET,
        saveUninitialized: true,
        resave: false,
        cookie: { maxAge: 600000 }, 

        rolling: false,
    })
)


const home = require("./Routers/home_route")
Application.use(home)


const sign = require("./Routers/sign_route")
Application.use(sign)


const adminn = require("./Routers/admin_route")
Application.use(adminn)

Application.get("/expire", (req, res) => {
    res.render("expire_subscriper")
})

//  gmail
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const moment = require('moment');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

// وظيفة لإرسال البريد الإلكتروني
const sendEmail = () => {
    let mailOptions = {
        from: process.env.EMAIL,
        to: 'aamedmukhtar@gmail.com',
        subject: 'تقرير  ',
        text: 'احمد عليك النظر في المشروع'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
};

// جدولة المهمة لنهاية كل شهر
const scheduleMonthlyEmail = () => {
    // const lastDayOfMonth = moment().endOf('month').toDate();
    // schedule.scheduleJob(lastDayOfMonth, () => {
        console.log('Sending end-of-month email...');
        sendEmail();
    // }
// );
};

// استدعاء الجدولة عند بدء التطبيق
// scheduleMonthlyEmail();





// 


Application.use((req, res) => {
    res.status(404).send("not founded")
})
