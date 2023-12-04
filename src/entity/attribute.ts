import { Entity, Column, PrimaryGeneratedColumn, JoinTable, OneToMany } from 'typeorm';
import { ManyToMany } from 'typeorm';
import { Template } from './template';
import { JoinColumn } from 'typeorm';
import { Document } from './document';
import { DocumentAttribute } from './documentAttribute';

@Entity()
export class Attribute{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    type!: string;

    @ManyToMany(() => Template, (template: Template) => template.attributes)
    templates!: Template[];

    @OneToMany(() => DocumentAttribute, documentAttribute => documentAttribute.attribute)
    document!: DocumentAttribute[];
}