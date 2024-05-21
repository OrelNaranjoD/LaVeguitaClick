import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  // Test if the service is defined
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test if the createTypeOrmOptions method returns TypeOrmModuleOptions
  it('should return TypeOrmModuleOptions', async () => {
    const result = await service.createTypeOrmOptions();
    expect(result).toHaveProperty('type');
    expect(result).toHaveProperty('host');
    expect(result).toHaveProperty('port');
    expect(result).toHaveProperty('username');
    expect(result).toHaveProperty('password');
    expect(result).toHaveProperty('database');
    expect(result).toHaveProperty('entities');
    expect(result).toHaveProperty('migrations');
    expect(result).toHaveProperty('dropSchema');
    expect(result).toHaveProperty('synchronize');
    expect(result).toHaveProperty('migrationsTableName');
    expect(result).toHaveProperty('logging');
  });
  
});