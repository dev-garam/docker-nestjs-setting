import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { QuoteEntity } from 'src/schemas/mysql/quote';
import { UserEntity } from 'src/schemas/mysql/user/entities';
import config from '.';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: config.MYSQL.HOST,
      port: config.MYSQL.PORT,
      username: config.MYSQL.USER_NAME,
      password: config.MYSQL.PASSWORD,
      database: config.MYSQL.DATABASE,
      entities: [UserEntity, QuoteEntity],
      synchronize: false,
      charset: 'utf8mb4_general_ci',
      extra: {
        connectionLimit: config.MYSQL.POOL_SIZE,
      },
    };
  }
}
@Injectable()
export class TypeOrmConfigTestService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3310,
      username: 'dev_test',
      password: 'test1234',
      database: 'test_database',
      synchronize: true,
      entities: [UserEntity, QuoteEntity],
      autoLoadEntities: true,
      extra: {
        connectionLimit: config.MYSQL.POOL_SIZE,
      },
      charset: 'utf8mb4_general_ci',
    };
  }
}