import e from "express";
import { prismaClient } from "../app/database";
import { ISiswa } from "../model/siswa.model";

interface ISiswaRepository {
    create(siswa : ISiswa) : Promise<ISiswa>
    getAllSiswa() : Promise<ISiswa[]>
    delete(id : string) : Promise<ISiswa>
    CheckSiswa(id : string) : Promise<ISiswa[]>
    detailSiswa(id : string) : Promise<ISiswa | undefined>
    updateSiswa(id : string, siswa : ISiswa) : Promise<ISiswa>

}

class SiswaRepository implements ISiswaRepository {

    async CheckSiswa(id: string): Promise<ISiswa[]> {
        try {
            const result = await prismaClient.siswa.findMany({
                where : {
                    id : id
                }
            })
            return result
        }catch(error){
            throw error
        }
    }

    async create(siswa: ISiswa): Promise<ISiswa> {
        try {
            return await prismaClient.siswa.create({data : siswa})
        }catch (error) {
            throw error
        }
    }
    async getAllSiswa(): Promise<ISiswa[]> {
       try {
           return await prismaClient.siswa.findMany()
       }catch (error) {
           throw error
       }
    }
    async delete(id: string): Promise<ISiswa> {
        try {
            return await prismaClient.siswa.delete({
                where : {
                    id : id
                }
            })
        }catch(e){
            throw e
        }
    }


    async detailSiswa(id: string): Promise<ISiswa | undefined> {
        try {
            const result = await  prismaClient.siswa.findUnique({
                where : {
                    id : id
                }
            }) 

            return result ? (result as ISiswa) : undefined;
        }catch(e){
            throw e
        }
    } 

    async updateSiswa(id: string, siswa: ISiswa): Promise<ISiswa> {
        try {
           return await prismaClient.siswa.update({
               where : {
                   id : id
               },
               data : siswa
           })

        }catch(e){
            throw e
        }
    }
   
    
}


export default new SiswaRepository()