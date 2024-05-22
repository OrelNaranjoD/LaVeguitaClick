import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {

    // Create TypeOrm options
    async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        return {
            type: process.env.DB_TYPE as 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: ['dist/entities/*.entity{.ts,.js}'],
            migrations: ['dist/db/migrations/*{.ts,.js}'],
            dropSchema: process.env.DB_DROP_SCHEMA === 'true',
            synchronize: process.env.DB_SYNCRONIZE === 'true',
            migrationsTableName: "migrations",
            logging: process.env.DB_LOGGING === 'true'
        };
    }

}