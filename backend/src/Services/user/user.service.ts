import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { UpdateUserDto } from '../../dto/user/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Role } from '../../entities/role.entity';
import { Repository, In } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) { }

  // Create a new user
  async create(user: CreateUserDto): Promise<Partial<User>> {
    const newUser = new User();
    newUser.username = user.username;
    newUser.email = user.email;
    newUser.password = bcrypt.hashSync(user.password, 10);
    if (user.roles) {
      const roles = await this.roleRepository.find({ where: { id: In(user.roles) } });
      newUser.roles = roles;
    }
    const savedUser = await this.userRepository.save(newUser);
    const { password, ...result } = savedUser;
    return result;
  }

  // Find all users
  async findAll() {
    return this.userRepository.find({ select: ['id', 'username', 'email', 'roles'] });
  }

  // Find a user by username
  async findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username }, relations: ['roles', 'roles.privileges'] });
  }

  // Update a user
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (updateUserDto.roles !== undefined) {
      const roleIds = updateUserDto.roles.map(role => role.id);
      user.roles = await this.roleRepository.find({
        where: { id: In(roleIds) },
      });
    }
    await this.userRepository.save(user);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }


  // Remove a user
  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id: id });
    await this.userRepository.remove(user);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}