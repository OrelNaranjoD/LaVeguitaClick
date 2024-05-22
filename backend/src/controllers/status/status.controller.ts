import { Controller, Get } from '@nestjs/common';
import { StatusService } from '../../services/status/status.service';

@Controller('/')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  getStatus() {
    return this.statusService.status();
  }
}
