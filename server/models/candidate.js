import {v4 as uuidv4} from "uuid";
import bcrypt from "bcrypt";
import db from "./other_con.js";

export default class Candidate {
    #CandidatID = uuidv4();
    #FullName = "";
    #CNE = "";
    #Password = "";


    constructor(fullName, cne, password) {
        this.fullName = fullName;
        this.cne = cne;
        this.password = password;
    }

    get id() {
        return this.#CandidatID
    }

    set fullName(value) {
        this.#FullName = value;
    }

    get fullName() {
        return this.#FullName;
    }

    set cne(value) {
        this.#CNE = value;
    }

    get cne() {
        return this.#CNE;
    }


    set password(value) {
        this.#Password = value;
    }


    get password() {
        return this.#Password
    }


    toObject() {
        return {
            id: this.id,
            cne: this.cne,
            fullName: this.fullName,
            password: this.password
        }
    }


    async save() {
        try {
            await db.collection("candidates").insertOne(this.toObject())
        } catch (e) {
            throw new Error(e);
        }
    }


    static async get() {
        try {
            return await db.collection("candidates").find({}, {projection:{_id:0}}).toArray()
        } catch (e) {

            throw  new Error(e)

        }
    }


    static async getByCNE(cne) {
        try {
            return await db.collection("candidates").findOne({cne: cne})
        } catch (e) {

            throw  new Error(e)

        }
    }
}
