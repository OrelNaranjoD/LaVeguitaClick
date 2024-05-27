import { Injectable } from '@nestjs/common';
import { CreateCityDto } from '../../dto/city/create-city.dto';
import { UpdateCityDto } from '../../dto/city/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from '../../entities/city.entity';

@Injectable()
export class CityService {

  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ){}

  create(createCityDto: CreateCityDto) {
    const city = this.cityRepository.create(createCityDto);
    return this.cityRepository.save(city);
  }

  findAll() {
    return this.cityRepository.find();
  }

  findOne(id: number) {
    return this.cityRepository.findOneBy({ id: id });
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return this.cityRepository.update(id, updateCityDto);
  }

  remove(id: number) {
    return this.cityRepository.delete(id);
  }
}
