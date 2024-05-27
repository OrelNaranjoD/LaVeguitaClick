import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from '../../dto/country/create-country.dto';
import { UpdateCountryDto } from '../../dto/country/update-country.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../../entities/country.entity';

@Injectable()
export class CountryService {

  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  create(createCountryDto: CreateCountryDto) {
    const country = this.countryRepository.create(createCountryDto);
    return this.countryRepository.save(country);
  }

  findAll() {
    return this.countryRepository.find();
  }

  findOne(id: number) {
    return this.countryRepository.findOneBy({ id: id });
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return this.countryRepository.update(id, updateCountryDto);
  }

  remove(id: number) {
    return this.countryRepository.delete(id);
  }
}
