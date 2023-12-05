import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Attribute } from "../entity/attribute"
import { Document } from "../entity/document"
import { In } from "typeorm"
import { DocumentAttribute } from "../entity/documentAttribute"
import { Template } from "../entity/template"

export class DocumentController {

    private documentRepository = AppDataSource.getRepository(Document);
    private attributeRepository = AppDataSource.getRepository(Attribute);
    private templateRepository = AppDataSource.getRepository(Template);
    private documentAttributeRepository = AppDataSource.getRepository(DocumentAttribute);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.documentRepository.find({
            relations: ["attributes"]
        });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const document = await this.documentRepository.findOne({
            where: { id },
            relations: ["attributes"]
        })

        if (!document) {
            return "document with id " + id + " does not exist"
        }
        return document
    }

    // если необходимо обновить - не указываем documentId, если хотим обновить - указываем
    async save(request: Request, response: Response, next: NextFunction) {
        const { documentId, name, templateId, attributeFields } = request.body;

        const attributeNamesArr = attributeFields.map(attr => attr.name);

        const attributes = await this.attributeRepository.find({
            where: {
                name: In(attributeNamesArr),
            }
        });

        const template = await this.templateRepository.findOne({ where: { id: templateId }, relations: ["attributes"] });

        const templateAttributesNamesArr = template.attributes.map(i => i.name);
        const missingAttributes = templateAttributesNamesArr.filter(attr => !attributeNamesArr.includes(attr));
        if(missingAttributes.length > 0){
            return "Missed attributes: " + missingAttributes.join(', ');
        }

        const excessAttributes = attributeNamesArr.filter(attr => !templateAttributesNamesArr.includes(attr));
        if(excessAttributes.length > 0){
            return "Excess attributes: " + excessAttributes.join(', ');
        }

        let document;
        if(documentId){
            document = await this.documentRepository.findOneBy({ id: documentId });
            // очищаем старые атрибуты
            const attrsToRemove = await this.documentAttributeRepository.find({ where: {document} });
            for(const attrToRemove of attrsToRemove){
                await this.documentAttributeRepository.remove(attrToRemove);
            }
        } else {
            document = new Document;
        }
        
        document.name = name;
        document.template = template;
        let savedDocument = await this.documentRepository.save(document);

        for(const attribute of attributes){
            const attributeDocument = new DocumentAttribute;
            attributeDocument.attribute = attribute;
            attributeDocument.document = savedDocument;
            attributeDocument.value = attributeFields.find(i => i.name === attribute.name).value;

            await this.documentAttributeRepository.save(attributeDocument);
        }

        const docWithRelations = await this.documentRepository.findOne({
            where: { id: document.id },
            relations: ["attributes", "template"]
        });

        return docWithRelations
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let docToRemove = await this.documentRepository.findOneBy({ id })
        if (!docToRemove) {
            return "this doc does not exist"
        }

        await this.documentRepository.remove(docToRemove)

        return "doc has been removed"
    }
}