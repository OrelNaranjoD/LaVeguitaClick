import { Injectable } from '@nestjs/common';
import { CreateCommuneDto } from '../../dto/commune/create-commune.dto';
import { UpdateCommuneDto } from '../../dto/commune/update-commune.dto';
import { Commune } from '../../entities/commune.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommuneService {

  constructor(
    @InjectRepository(Commune)
    private communeRepository: Repository<Commune>,
  ) {}

  create(createCommuneDto: CreateCommuneDto) {
    const commune = this.communeRepository.create(createCommuneDto);
    return this.communeRepository.save(commune);
  }

  findAll() {
    return this.communeRepository.find();
  }

  findOne(id: number) {
    return this.communeRepository.findOneBy({ id: id });
  }

  update(id: number, updateCommuneDto: UpdateCommuneDto) {
    return this.communeRepository.update(id, updateCommuneDto);
  }

  remove(id: number) {
    return this.communeRepository.delete(id);
  }
}
