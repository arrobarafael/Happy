import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphanage from "../models/Orphanage";
import Image from "../models/Image";

export default {
    async index(request: Request, response: Response){
        const orphanageRepository = getRepository(Orphanage);
        
        
        const orphanages = await orphanageRepository.find();

        return response.json(orphanages);
    },

    async show(request: Request, response: Response){
        const {id} = request.params;
        const orphanageRepository = getRepository(Orphanage);
        
        const orphanage = await orphanageRepository.findOneOrFail(id);

        return response.json(orphanage);
    },

    async create(request: Request, response: Response){
        const { 
            name, 
            latitude, 
            longitude, 
            about,
            instructions,
            opening_hours,
            open_on_weekends  
        } = request.body;
    
        const orphanageRepository = getRepository(Orphanage);

        //força request.files a ser array
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path : image.filename }
        })

    
        const orphanage = orphanageRepository.create({
            name, 
            latitude, 
            longitude, 
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        })
    
        await orphanageRepository.save(orphanage);

        const imageRepository = getRepository(Image);
        images.map(img => {
            const image = imageRepository.create({
                path: img.path,
                orphanage_id: orphanage.id
            })
            imageRepository.save(image);
        })
    
        return response.status(201).json(orphanage)
    }
}