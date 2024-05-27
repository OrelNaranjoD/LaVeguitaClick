import { Module } from '@nestjs/common';
import { ContactController } from '../controllers/contact/contact.controller';
import { ContactService } from '../services/contact/contact.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from '../entities/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
