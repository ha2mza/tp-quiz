import express from "express"
import {Question, QUESTION_TYPE} from "../models/index.js";


const questionRouter = express.Router();

questionRouter.post('/', async (req, res) => {
    try {

        if(!req.body.answer)
        {
            res.statusCode = 400
            res.send({"msg": 'Answer required!!'})
            return
        }

        if(!req.body.statement)
        {
            res.statusCode = 400
            res.send({"msg": 'Statement required!!'})
            return
        }


        if(!req.body.duration)
        {
            res.statusCode = 400
            res.send({"msg": 'Duration required!!'})
            return
        }


        if(!req.body.point)
        {
            res.statusCode = 400
            res.send({"msg": 'Point required!!'})
            return
        }

        if(!req.body.type)
        {
            res.statusCode = 400
            res.send({"msg": 'Type required!!'})
            return
        }

        if(!QUESTION_TYPE[req.body.type]){
            res.statusCode = 400
            res.send({"msg": 'Type incorrect!!'})
            return
        }

        const question = new Question(req.body.type, req.body.statement, req.body.answer, req.body.duration, req.body.point);
        question.save().then(r => {
            res.statusCode = 200
            res.send({question: question.toObject()})
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


questionRouter.get('/', async (req, res) => {
    try {

        Question.get().then(r => {
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

export default questionRouter
