import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Attribute } from "../entity/attribute"

export class AttributeController {

    private attributeRepository = AppDataSource.getRepository(Attribute)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.attributeRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const attribute = await this.attributeRepository.findOne({
            where: { id }
        })

        if (!attribute) {
            return "attribute with id " + id  + " does not exits"
        }
        return attribute
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name, type } = request.body;

        const attribute = Object.assign(new Attribute(), {
            name,
            type,
        })

        return this.attributeRepository.save(attribute)
    }
}