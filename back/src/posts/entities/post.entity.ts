import { Comment } from 'src/comments/entities/comment.entity';
import { ReadingSession } from 'src/reading-session/entities/reading-session.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PostType {
  NOTE = 'note',
  PASSAGE = 'passage',
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'enum', enum: PostType })
  type!: PostType;

  @Column()
  content!: string;

  @Column({ nullable: true, type: 'varchar' })
  chapterSection?: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne(() => User)
  author!: User;

  @ManyToOne(() => ReadingSession, { onDelete: 'CASCADE' })
  readingSession!: ReadingSession;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments!: Comment[];
}
