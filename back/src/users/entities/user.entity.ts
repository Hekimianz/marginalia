import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ nullable: true, type: 'varchar' })
  avatar?: string | null;

  @Column({ default: false })
  isDeleted!: boolean;

  @Exclude()
  @Column({ select: false })
  password!: string;
}
