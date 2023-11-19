import express from "express"
import {Candidate} from "../models/index.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";


const authRouter = express.Router();


authRouter.post('/login', async (req, res) => {

    try {

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

        const candidate = (await Candidate.getByCNE(req.body.CNE))
        const validPassword = await bcrypt.compare(req.body.password, candidate?.password);
        if (candidate && validPassword) {
            const token = jwt.sign(candidate, "quiz@2023$");
            res.statusCode = 200
            res.send({access_token: token})

        } else {
            res.statusCode = 400
            res.send({"msg": "CNE or password incorrect!!"})
        }
    } catch (e) {
        res.statusCode = 400
        res.send({"msg": e.message})
    }
})


export default authRouter
