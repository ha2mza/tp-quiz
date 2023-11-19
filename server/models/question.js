import {v4 as uuidv4} from 'uuid';
import {QUESTION_TYPE} from "./question_type.js";
import db from "./other_con.js";

export default class Question {

    #QuestionID = uuidv4()
    #Statement;
    #Answer;
    #Duration;
    #Point;
    #Type

    constructor(type, statement, answer, duration, point) {
        this.#Answer = answer;
        this.#Statement = statement;
        this.#Duration = duration;
        this.#Point = point;
        this.#Type = QUESTION_TYPE[type]
    }

    get id(){
        return this.#QuestionID
    }

    get answer() {
        return this.#Answer
    }

    get statement() {
        return this.#Statement
    }

    get duration() {
        return this.#Duration
    }

    get point() {
        return this.#Point
    }


    get type(){
        return this.#Type
    }


    toObject(){
        return {
            id: this.id,
            answer: this.answer,
            statement: this.statement,
            duration: this.duration,
            point: this.point,
            type: this.type
        }
    }



    async save(){
        try{
            await db.collection("questions").insertOne(this.toObject())
        }
        catch (e){
            throw new Error(e);
        }
    }


    static async get(){
        try{
            return await db.collection("questions").find({}, {projection:{_id:0}}).toArray()
        }
        catch (e) {

            throw  new Error(e)

        }
    }



    static async getByID(id){
        try{
            return await db.collection("questions").findOne({id : id}, {projection:{_id:0}})
        }
        catch (e) {

            throw  new Error(e)

        }
    }

}
