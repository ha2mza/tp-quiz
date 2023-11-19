
import express from 'express';
import cors from 'cors';
import candidateRouter from "./routes/candidate.js";
import jwt from "jsonwebtoken";
import authRouter from "./routes/auth.js";
import questionRouter from "./routes/question.js";
import quizRouter from "./routes/quiz.js";
const app = express()

const authenticationCheck =  (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(403)

    jwt.verify(token, "quiz@2023$", (err, user) => {
        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

app.use(express.json())
app.use(cors())
app.use("/candidates", candidateRouter);
app.use("/questions", questionRouter);
app.use("/quiz", quizRouter);
app.use("/auth", authRouter);
app.use(authenticationCheck)


app.get('/products', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
})



function generateHtml(question) {
    switch (question.type) {
        case QUESTION_TYPE.VF:
            return generateVFQuestion(question)
        case QUESTION_TYPE.QCU:
            return generateQCUQuestion(question)
        case QUESTION_TYPE.QCM:
            return generateQCMQuestion(question)
        case QUESTION_TYPE.QROC:
            return generateQROCQuestion(question)
        case QUESTION_TYPE.QOPR:
            return generateQOPRQuestion(question)
    }
}

function generateVFQuestion(question) {
    return `
    
    <div class="form-group">
    <label>${question.statement}</label>
    <div class="vf-question">
    <span>
    <input type="radio" name="${question.id}" value="1">
    True
</span>
<span>
    <input type="radio" name="${question.id}" value="0">
    False
</span>
</div>
    </div>
    
    `
}

function generateQCUQuestion(question) {
    return `
    
    <div class="form-group">
    <label>${question.statement[0]}</label>
    <div class="qcu-question">
    ${
        question.statement.forEach((item, index) => {
            if (index !== 0)
                return `<span><input type="radio" name="${question.id}" value="${index}"> ${item} </span>`

            return ""
        })
    }
</div>
    </div>
    
    `
}

function generateQCMQuestion(question) {

    return `
    
    <div class="form-group">
    <label>${question.statement[0]}</label>
    <div class="qcm-question">
    ${
        question.statement.forEach((item, index) => {
            if (index !== 0)
                return `<span><input type="checkbox" name="${question.id}" value="${index}"> ${item} </span>`

            return ""
        })
    }
</div>
    </div>
    
    `

}


function generateQROCQuestion(question) {

    return `
    
    <div class="form-group">
    <label>${question.statement}</label>
    <div class="qroc-question">
    <span>
    <input type="text" name="${question.id}"> 
    </span>
</div>
    </div>
    
    `

}

function generateQOPRQuestion(question) {
    return `
    
    <div class="form-group">
    <label>${question.statement[0]}</label>
    <div class="qopr-question">
  
    ${
        question.statement.forEach((item, index) => {
            if (index !== 0)
                return `<div class="sub-question"><label>${item}</label> <input type="text" name="${question.id}[${index}]"/> </div>`

            return ""
        })
    }
</div>
    </div>
    
    `
}

/* for hash password

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
});

 */


/* for compare password

bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // result == true
});

 */
