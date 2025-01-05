import { Request, Response } from "express";
import SiswaRepository from "../repo/siswa.repository";
import { prismaClient } from "../app/database";
import { ISiswa } from "../model/siswa.model";
import ResponseError from "../error/error";

export default  class SiswaController {

  async create(req : Request, res : Response) {
    const siswa = req.body    
    
    try {
      if(!siswa.nama || !siswa.nis || !siswa.rayon || !siswa.jurusan) {
           res.status(400).json({ message: "Missing required fields" });
           return
      }
  
      if(siswa.nis){
          const existSiswa : ISiswa[] = await SiswaRepository.getAllSiswa()
          existSiswa.map(siswa => {
            if(siswa.nis === req.body.nis) {
              res.status(400).json({ message: "NIS already exist" });
              }
          })
          return
      }
      const result = await SiswaRepository.create(siswa)
      res.status(201).json(result);
    }catch (error) {
      new ResponseError("Failed to create siswa", 500)
    }

  }


  async getAll(req : Request, res : Response){
    try {
      const allSiswa = await SiswaRepository.getAllSiswa()
      res.status(200).json(allSiswa);
    } catch (error) {
      new ResponseError("Failed to get all siswa", 500)
    }
  }




  async delete(req : Request, res : Response){
    const id : string = req.params.id
    
    try {
      if(!id){
          res.status(400).json({ message: "Missing required parameters" });
          return
      }
  
      if(id) {
          const result = await prismaClient.siswa.findMany({
              where : {
                  id : id
              }
          })
          if(result.length === 0) {
              res.status(404).json({ message: "Siswa not found" });
          }
          return
      }
        await SiswaRepository.delete(id)
        res.status(200).json({
            message : "Siswa deleted successfully",

        });
    
    }catch(e){
        new ResponseError("Failed to delete siswa", 500)
    }
  }

  async detailSiswa(req : Request, res : Response) {
    const id : string = req.params.id
    if(!id){
        res.status(400).json({ message: "Missing required parameters" });
        return
    }



    try {
     const result = await SiswaRepository.detailSiswa(id)

      res.status(200).json(result);
    }catch(e){
       new ResponseError("Failed to get detail siswa", 500)
    }
  }


  async updateSiswa(req : Request, res : Response) {
    const id : string = req.params.id
    const siswa : ISiswa = req.body


    try {
      if(!id || !siswa){
        res.status(400).json({ message: "Missing required parameters" });

        return
      }

      if(siswa.nis){
        const existSiswa : ISiswa[] = await SiswaRepository.getAllSiswa()
        existSiswa.map(siswa => {
          if(siswa.nis === req.body.nis) {
            res.status(400).json({ message: "NIS already exist" });
          }
        })

        return
      }


      const result = await SiswaRepository.updateSiswa(id, siswa)

      res.status(200).json(result);
    }catch(e){
        new ResponseError("Failed to update siswa", 500)
    }
  }
}
