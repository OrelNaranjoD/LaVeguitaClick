import { Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SeederService } from '../../services/seeder/seeder.service';

@Controller('seed')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post()
  async seed(@Res() res: Response) {
    try {
      await this.seederService.seed();
      return res.status(201).json({ message: 'Data seeded successfully!' });
    } catch (error) {
      return res.status(500).json({ message: 'Data seeding failed! Error: Seed failed' });
    }
  }
}