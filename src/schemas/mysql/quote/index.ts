import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CommonEntity } from '../common/entities';
import { UserEntity } from '../user/entities';

@Entity('quote')
export class QuoteEntity extends CommonEntity {
  @Column('decimal', { precision: 20, scale: 12 })
  exchangeRate: number;

  @Column('decimal', { precision: 20, scale: 3 })
  usdExchangeRate: number;

  @Column('datetime')
  expireTime: Date;

  @Column('decimal', { precision: 14, scale: 3 })
  targetAmount: number;

  @Column('char', { length: 3 })
  targetCurrency: string;

  @Column('integer')
  fee: number;

  @Column('decimal', { precision: 10, scale: 2 })
  usdAmount: number;

  @Column('integer')
  sourceAmount: number;

  @Column('boolean', { default: false })
  requestCompleted: boolean;

  @Column('datetime', { default: null })
  requestedDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.quotes)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
