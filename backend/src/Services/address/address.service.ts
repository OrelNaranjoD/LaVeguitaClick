import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from '../../dto/address/create-address.dto';
import { UpdateAddressDto } from '../../dto/address/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '../../entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {

  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  create(createAddressDto: CreateAddressDto) {
    const address = this.addressRepository.create(createAddressDto);
    return this.addressRepository.save(address);
  }

  findAll() {
    return this.addressRepository.find();
  }

  findOne(id: number) {
    return this.addressRepository.findOneBy({ id: id });
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return this.addressRepository.update(id, updateAddressDto);
  }

  remove(id: number) {
    return this.addressRepository.delete(id);
  }
}
