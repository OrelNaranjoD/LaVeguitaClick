import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from '../../dto/account/create-account.dto';
import { UpdateAccountDto } from '../../dto/account/update-account.dto';
import { Repository } from 'typeorm';
import { Account } from '../../entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  // Create a new account
  create(createAccountDto: CreateAccountDto) {
    const account = this.accountRepository.create(createAccountDto);
    return this.accountRepository.save(account);
  }

  // Find isActive acount
  findActive(id: number) {
    return this.accountRepository.findOneBy({ id: id });
  }

  // Update status of an account
  update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.accountRepository.update(id, updateAccountDto);
  }

}
