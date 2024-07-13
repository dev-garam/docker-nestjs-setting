import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { CommonEntity } from '../../common/entities';
import { QuoteEntity } from '../../quote';
import { IdType } from '../../../../domains/user/types';

@Entity({ name: 'user' })
export class UserEntity extends CommonEntity {
  @Column({ unique: true })
  userId: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  idType: IdType;

  @Column()
  idValue: string;

  @OneToMany(() => QuoteEntity, quotes => quotes.user)
  quotes: QuoteEntity[];
}