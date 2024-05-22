import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../../dto/role/create-role.dto';
import { UpdateRoleDto } from '../../dto/role/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../entities/role.entity';

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  // Create a new role
  create(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }

  // Find all role
  findAll() {
    return this.roleRepository.find();
  }

  // Find one role
  findOne(id: number) {
    return this.roleRepository.findOneBy({ id: id });
  }

  // Update a role
  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update(id, updateRoleDto);
  }

  // Remove a role
  remove(id: number) {
    return this.roleRepository.delete(id);
  }
}
