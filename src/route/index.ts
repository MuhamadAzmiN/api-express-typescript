import express, { Application } from "express";
import SiswaRoute from "./siswa.routes";
export default class Routes {
    constructor(app : Application){
        app.use("/api", SiswaRoute)
    }
}