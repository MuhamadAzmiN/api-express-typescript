import { Router } from "express";
import SiswaController from "../controller/SiswaController";

class SiswaRoute {
    router = Router()
    controller = new SiswaController()

    constructor() {
        this.intializeRoutes()
    }
    intializeRoutes() {
       this.router.post('/create', this.controller.create)
       this.router.get('/all', this.controller.getAll)
       this.router.delete('/delete/:id', this.controller.delete)
       this.router.get('/detail/:id', this.controller.detailSiswa)
       this.router.put('/update/:id', this.controller.updateSiswa)
    }
}



export default new SiswaRoute().router;
