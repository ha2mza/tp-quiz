import {v4 as uuidv4} from "uuid";
import db from "./other_con.js";

export default class Quiz {
    #QuizID = uuidv4()
    #Description
    #QuizMark
    #DurationTotal
    #Questions = []

    constructor(description, questions) {
        this.#Questions = questions
        this.#Description = description
        this.#QuizMark = questions.map(q => q.point).reduce((sum, point) => sum + point)
        this.#DurationTotal = questions.map(q => q.duration).reduce((sum, duration) => sum + duration)
    }


    get id() {
        return this.#QuizID
    }

    get questions() {
        return this.#Questions;
    }

    get description() {
        return this.#Description
    }

    get duration(){
        return this.#DurationTotal
    }

    get quizMark(){
        return this.#QuizMark
    }

    toObject(){
        return {
            id: this.id,
            description: this.description,
            mark: this.quizMark,
            duration: this.duration,
            questions: this.questions
        }
    }


    async save(){
        try{
            await db.collection("quizes").insertOne(this.toObject())
        }
        catch (e){
            throw new Error(e);
        }
    }


    static async get(){
        try{
            return await db.collection("quizes").find({}, {projection:{_id:0}}).toArray()
        }
        catch (e) {

            throw  new Error(e)

        }
    }
}
