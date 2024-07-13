import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/config';
import {
  TypeOrmConfigService,
  TypeOrmConfigTestService,
} from 'src/config/typeorm.config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass:
        config.NODE_ENV === 'test'
          ? TypeOrmConfigTestService
          : TypeOrmConfigService,
    }),
  ],
})
export class MySQLModule {}
