import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: +configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [
        'src/_commom/entities/*.entity{.ts,.js}',
        'src/_commom/entities/base.entity.ts',
    ],
    migrations: [__dirname + '/migrations/*.ts'],
}

export default new DataSource(dataSourceOptions);