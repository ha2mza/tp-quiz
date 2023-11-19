import express from "express"
import {Question, Quiz} from "../models/index.js";


const quizRouter = express.Router();

quizRouter.post('/add', async (req, res) => {
    try {

        if(!req.body.description)
        {
            res.statusCode = 400
            res.send({"msg": 'Description required!!'})
            return
        }

        if(!req.body.questions)
        {
            res.statusCode = 400
            res.send({"msg": 'Questions required!!'})
            return
        }

        if(!Array.isArray(req.body.questions))
        {
            res.statusCode = 400
            res.send({"msg": 'Questions invalid format!!'})
            return
        }


        let questions = []

        for(let i =0 ; i< req.body.questions.length ; i++){
            try {
                const question =  await Question.getByID(req.body.questions[i])
                questions.push(question);
            }
            catch (e){

            }
        }


        const quiz = new Quiz(req.body.description, questions);
        quiz.save().then(r => {
            res.statusCode = 200
            res.send({quiz: quiz.toObject()})
        }).catch((e) => {
            res.statusCode = 500
            res.send({"msg": e.message})
        });

    } catch (e) {
        console.log(e)
        res.statusCode = 400
        res.send({"msg": e.message})
    }
})


quizRouter.get('/list', async (req, res) => {
    try {

        Quiz.get().then(r => {
            res.statusCode = 200
            res.send(r)
        }).catch((e) => {
            res.statusCode = 500
            res.send({"msg": e.message})
        });

    } catch (e) {
        console.log(e)
        res.statusCode = 400
        res.send({"msg": e.message})
    }
})

export default quizRouter
