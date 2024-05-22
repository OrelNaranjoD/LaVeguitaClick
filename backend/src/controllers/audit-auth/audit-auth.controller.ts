import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CreateAuditAuthDto } from '../../dto/audit-auth/create-audit-auth.dto';
import { AuditAuthService } from '../../services/audit-auth/audit-auth.service';

@Controller('audit-auth')
export class AuditAuthController {
  constructor(private readonly auditAuthService: AuditAuthService) {}

  @Post()
  create(@Body() createAuditAuthDto: CreateAuditAuthDto) {
    return this.auditAuthService.create(createAuditAuthDto);
  }

  @Get('table-name')
  findAllTableName(@Query('tableName') tableName: string) {
    return this.auditAuthService.findAllTableName(tableName);
  }

  @Get('action')
  findAllAction(@Query('action') action: string) {
    return this.auditAuthService.findAllAction(action);
  }

  @Get('user-id')
  findAllUserId(@Query('userId') userId: number) {
    return this.auditAuthService.findAllUserId(userId);
  }

  @Get('user-id-action')
  findAllUserIdAndAction(@Query('userId') userId: number, @Query('action') action: string) {
    return this.auditAuthService.findAllUserIdAndAction(userId, action);
  }
}