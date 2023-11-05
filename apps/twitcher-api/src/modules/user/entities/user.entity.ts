import { Column, CreateDateColumn, Entity, EntityRepository, PrimaryGeneratedColumn, Repository, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 15 })
  country: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  password: string;

  @Column({ type: 'int' })
  age: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}


export class UserRepository extends Repository<User> {}
