import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Attribute } from "../entity/attribute"
import { Template } from "../entity/template"
import { In } from "typeorm"

export class TemplateController {

    private templateRepository = AppDataSource.getRepository(Template);
    private attributeRepository = AppDataSource.getRepository(Attribute);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.templateRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const template = await this.templateRepository.findOne({
            where: { id }
        })

        if (!template) {
            return "unregistered user"
        }
        return template
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name, attributesId } : {name: string, attributesId: number[]} = request.body;
        const attributes = await this.attributeRepository.find({
            where: {
                id: In(attributesId),
            }
        });
        
        const template = new Template();
        template.name = name;
        template.attributes = attributes;

        const savedTemplate = await this.templateRepository.save(template);

        return savedTemplate;
    }
}