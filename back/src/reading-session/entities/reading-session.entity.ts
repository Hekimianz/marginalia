import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum ReadingSessionStatus {
  READING = 'reading',
  FINISHED = 'finished',
  DID_NOT_FINISH = 'did_not_finish',
}

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

  @Column({
    type: 'enum',
    enum: ReadingSessionStatus,
    default: ReadingSessionStatus.READING,
  })
  status!: ReadingSessionStatus;

  @ManyToOne(() => Book)
  book!: Book;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user!: User;
}
