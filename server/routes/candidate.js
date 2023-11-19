import express from "express"
import {Candidate} from "../models/index.js";
import bcrypt from "bcrypt";


const candidateRouter = express.Router();

candidateRouter.post('/', async (req, res) => {
    try {

        if(!req.body.fullName)
        {
            res.statusCode = 400
            res.send({"msg": 'FullName required!!'})
            return
        }

        if(!req.body.CNE)
        {
            res.statusCode = 400
            res.send({"msg": 'CNE required!!'})
            return
        }


        if(!req.body.password)
        {
            res.statusCode = 400
            res.send({"msg": 'Password required!!'})
            return
        }

        let existing_candidate
        try {
            existing_candidate = (await Candidate.getByCNE(req.body.CNE)) != null
        } catch (e) {
            res.statusCode = 500
            res.send({"msg": e.message})
            return
        }

        if (existing_candidate) {
            res.statusCode = 400;
            res.send({msg: "This candidate already exists!!"})
            return
        }

        const hashPassword = await bcrypt.hash(req.body.password, 12);

        const candidate = new Candidate(req.body.fullName, req.body.CNE, hashPassword);
        candidate.save().then(r => {
            res.statusCode = 200
            res.send({candidate: candidate.toObject()})

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


candidateRouter.get('/', (req, res) => {
    try {

        Candidate.get().then(r => {
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

export default candidateRouter
