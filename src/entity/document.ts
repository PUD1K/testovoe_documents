import { Entity, Column, PrimaryGeneratedColumn, JoinTable, OneToMany } from 'typeorm';
import { ManyToMany } from 'typeorm';
import { Template } from './template';
import { JoinColumn } from 'typeorm'; 
import { ManyToOne } from 'typeorm';
import { DocumentAttribute } from './documentAttribute';

@Entity()
export class Document{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToOne(() => Template, template => template.id)
    template!: Template;

    @OneToMany(() => DocumentAttribute, documentAttribute => documentAttribute.document)
    attributes!: DocumentAttribute[];
}