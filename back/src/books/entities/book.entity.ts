import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  author!: string;

  @Column({ default: null, nullable: true, type: 'varchar' })
  cover!: string | null;

  @Column({ default: null, nullable: true, unique: true, type: 'varchar' })
  openLibraryWorkId!: string | null;
}
