import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToMany } from 'typeorm';
import { Attribute } from './attribute';
import { JoinTable } from 'typeorm';

@Entity()
export class Template{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToMany(() => Attribute, attribute => attribute.templates)
    @JoinTable({
        name: 'attribute_templates',
        joinColumn: { name: 'template_id', referencedColumnName: 'id', },
        inverseJoinColumn: { name: 'attribute_id', referencedColumnName: 'id' },
    })
    attributes!: Attribute[]
}