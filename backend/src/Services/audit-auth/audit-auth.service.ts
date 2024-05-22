import { Injectable } from '@nestjs/common';
import { CreateAuditAuthDto } from '../../dto/audit-auth/create-audit-auth.dto';
import { AuditAuth } from '../../entities/audit-auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuditAuthService {

  constructor(
    @InjectRepository(AuditAuth)
    private auditAuthRepository: Repository<AuditAuth>
  ) { }

  // Create a new auditAuth
  async create(createAuditAuthDto: CreateAuditAuthDto) {
    const newAuditAuth = this.auditAuthRepository.create(createAuditAuthDto);
    return await this.auditAuthRepository.save(newAuditAuth);
  }

  // Get all auditAuth is equal to tableName
  async findAllTableName(tableName: string) {
    return await this.auditAuthRepository.find({ where: { tableName } });
  }

  // Get all auditAuth is equal action
  async findAllAction(action: string) {
    return await this.auditAuthRepository.find({ where: { action } });
  }

  // Get all auditAuth is equal to userId
  async findAllUserId(userId: number) {
    return await this.auditAuthRepository.find({ where: { userId: userId }, relations: ["user"] });
  }

  // Get all auditAuth is equal to userId and action
  async findAllUserIdAndAction(userId: number, action: string) {
    return await this.auditAuthRepository.find({ where: { userId: userId, action: action }, relations: ["user"] });
  }

}
