import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  author!: string;

  @Column({ default: null, nullable: true })
  cover!: string;

  @Column({ default: null, nullable: true })
  bookId!: string;
}
