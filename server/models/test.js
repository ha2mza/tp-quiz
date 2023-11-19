import {v4 as uuidv4} from "uuid";
import db from "./other_con.js";

export default class Test {
    #TestID
    #Mark = 0
    #Answers = []
    #DurationTest = 0
    #Quiz
    #Candidate

    constructor(quiz, candidate) {
        this.#TestID = uuidv4();
        this.#Quiz = quiz
        this.#Candidate = candidate
    }

    addAnswer(questionID, answer, duration) {
        let questionIndex = this.#Quiz.questions.findIndex(q => q.id === questionID);

        if (questionIndex < -1)
            throw new Error("Ops! question not detected");

        let question = this.#Quiz.questions[questionIndex];
        this.#Answers.push({
            question,
            answer,
            duration
        })
        this.calculateMark();
        this.calculateDuration();
    }

    calculateMark() {

    }

    calculateDuration() {
        this.#DurationTest = this.#Answers.map(answer => answer.duration)
            .reduce((sum, duration) => sum + duration);
    }

    get mark() {
        return this.#Mark
    }

    get duration() {
        return this.#DurationTest
    }

    toObject(){
        return {
            candidate: this.#Candidate,
            id: this.#TestID,
            mark: this.#Mark,
            duration: this.#DurationTest,
            answers: this.#Answers,
            quiz: this.#Quiz,
        }
    }


    async save() {
        try {
            await db.collection("tests").insertOne(this.toObject())
        } catch (e) {
            throw new Error(e)
        }
    }

    static async get() {
        try {
            return await db.collection("tests").find({}, { _id: 0 })
        } catch (e) {
            throw new Error(e)
        }

    }


    static async getByCandidate(id) {
        try {
            return await db.collection("tests").find({candidate: {id: id} }, { _id: 0 }).toArray()
        } catch (e) {
            throw new Error(e)
        }

    }
}
