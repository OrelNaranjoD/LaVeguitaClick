import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from '../../entities/region.entity';
import { City } from '../../entities/city.entity';
import { Commune } from '../../entities/commune.entity';
import { Country } from '../../entities/country.entity';
import { countries } from '../../entities/data/country.data';
import { regions } from '../../entities/data/region.data';
import { cities } from '../../entities/data/city.data';
import { communes } from '../../entities/data/commune.data';

@Injectable()
export class SeederService {

  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    @InjectRepository(Commune)
    private communeRepository: Repository<Commune>,
  ) { }

  async seed() {
    try {
      await this.countryRepository.save(countries);
      await this.regionRepository.save(regions);
      await this.cityRepository.save(cities);
      await this.communeRepository.save(communes);
      return { message: 'Data seeded successfully!' };
    } catch (error) {
      throw new Error(`Data seeding failed! Error: ${error.message}`);
    }
  }
}
