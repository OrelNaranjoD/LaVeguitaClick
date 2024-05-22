import { Injectable } from '@nestjs/common';
import { CreatePrivilegeDto } from '../../dto/privilege/create-privilege.dto';
import { UpdatePrivilegeDto } from '../../dto/privilege/update-privilege.dto';
import { Privilege } from '../../entities/privilege.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PrivilegeService {

  constructor(
    @InjectRepository(Privilege)
    private privilegeRepository: Repository<Privilege>,
  ) {}

  // Create a new privilege
  create(createPrivilegeDto: CreatePrivilegeDto) {
    const privilege = this.privilegeRepository.create(createPrivilegeDto);
    return this.privilegeRepository.save(privilege);
  }

  // Find all privilege
  findAll() {
    return this.privilegeRepository.find();
  }

  // Find one privilege
  findOne(id: number) {
    return this.privilegeRepository.findOneBy({ id: id });
  }

  // Update a privilege
  update(id: number, updatePrivilegeDto: UpdatePrivilegeDto) {
    return this.privilegeRepository.update(id, updatePrivilegeDto);
  }

  // Remove a privilege
  remove(id: number) {
    return this.privilegeRepository.delete(id);
  }
}
