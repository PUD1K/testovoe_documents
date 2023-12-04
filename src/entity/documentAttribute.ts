import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Document } from './document';
import { Attribute } from './attribute';

@Entity()
export class DocumentAttribute {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Document, document => document.attributes)
  @JoinColumn({ name: 'documentId' })
  document!: Document;

  @ManyToOne(() => Attribute, attribute => attribute.document)
  @JoinColumn({ name: 'attributeId' })
  attribute!: Attribute;

  @Column({ type: 'varchar', nullable: true })
  value?: string;
}