import "reflect-metadata"
import { DataSource } from "typeorm"
import { Attribute } from "./entity/attribute"
import { Document } from "./entity/document"
import { Template } from "./entity/template"
import { DocumentAttribute } from "./entity/documentAttribute"

export const AppDataSource = new DataSource({
    synchronize: true,
    logging: false,
    entities: [Attribute, Document, Template, DocumentAttribute],
    migrations: [],
    subscribers: [],

    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "test",
})
