import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { CreateAccountDto } from '../../dto/account/create-account.dto';
import { UpdateAccountDto } from '../../dto/account/update-account.dto';
import { AccountService } from '../../services/account/account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get(':id')
  findActive(@Query('id') id: string) {
    return this.accountService.findActive(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(+id, updateAccountDto);
  }

}
