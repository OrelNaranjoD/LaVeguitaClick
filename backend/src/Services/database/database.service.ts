import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';

// Load environment variables file
dotenv.config({ path: '../.env' });

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {

    // Create TypeOrm options
    async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        return {
            type: process.env.DB_TYPE as 'postgres' | 'mysql' | 'mariadb' | 'sqlite' | 'oracle' | 'mssql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: ['dist/entities/*.entity{.ts,.js}'],
            migrations: ['dist/db/migrations/*{.ts,.js}'],
            dropSchema: Boolean(process.env.DB_DROP_SCHEMA),
            synchronize: Boolean(process.env.DB_SYNCRONIZE),
            migrationsTableName: "migrations",
            logging: Boolean(process.env.DB_LOGGING)
        };
    }
    
}