import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReadingSession {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  synthesis?: string;

  @Column({ nullable: true })
  review?: string;

  @Column({ nullable: true, type: 'decimal' })
  rating?: number;

  @ManyToOne(() => Book)
  book!: Book;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user!: User;
}
