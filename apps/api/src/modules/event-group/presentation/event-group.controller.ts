import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CurrentUserType } from 'src/decorators/types/current-user.type';
import { JWTGuard } from 'src/modules/auth/guards/jwt.guard';
import { Message } from 'src/modules/shared/dto/message.dto';
import { EventGroupDetailDto } from '../application/query-service/dto/event-group-detail.dto';
import { AddExpenseUseCase } from '../application/use-cases/add-expense.use-case';
import { AddMemberUseCase } from '../application/use-cases/add-member.use-case';
import { CreateEventGroupUseCase } from '../application/use-cases/create-event-group.use-case';
import { DeleteEventGroupUseCase } from '../application/use-cases/delete-event-group.use-case';
import { DeleteExpenseUseCase } from '../application/use-cases/delete-expense.use-case.ts';
import { DeleteMemberUseCase } from '../application/use-cases/delete-member.use-case.dto';
import { GetAllGroupsUseCase } from '../application/use-cases/get-all-groups.use-case';
import { getGroupUseCase } from '../application/use-cases/get-group.use-case';
import { UpdateEventGroupUseCase } from '../application/use-cases/update-event-group.use-case';
import { UpdateExpenseUseCase } from '../application/use-cases/update-expense.use-case';
import { MemberDto } from './dto/add-member.dto';
import { EventGroupDto } from './dto/event-group.dto';
import { ExpenseDto } from './dto/expense.dto';
import { ReturnGroupDto } from './dto/return-event-group.dto';

@ApiTags('event-group')
@UseGuards(JWTGuard)
@Controller('event-group')
export class EventGroupController {
  constructor(
    private readonly createEventGroupUseCase: CreateEventGroupUseCase,
    private readonly updateEventGroupUserCase: UpdateEventGroupUseCase,
    private readonly getGroupUseCase: getGroupUseCase,
    private readonly getAllGroupsUseCase: GetAllGroupsUseCase,
    private readonly deleteMemberUserCase: DeleteMemberUseCase,
    private readonly deleteEventGroupUseCase: DeleteEventGroupUseCase,
    private readonly addExpenseUseCase: AddExpenseUseCase,
    private readonly updateExpenseUseCase: UpdateExpenseUseCase,
    private readonly deleteExpenseUseCase: DeleteExpenseUseCase,
    private readonly addMemberUseCase: AddMemberUseCase,
  ) {}

  @ApiException(() => [BadRequestException, UnauthorizedException])
  @Post()
  async create(
    @Body() dto: EventGroupDto,
    @CurrentUser() user: CurrentUserType,
  ): Promise<Message> {
    await this.createEventGroupUseCase.execute(dto, user);
    return { message: 'Successfully created!' };
  }

  @ApiException(() => [
    BadRequestException,
    NotFoundException,
    UnauthorizedException,
  ])
  @Put(':groupId')
  async updateEvent(
    @Body() dto: EventGroupDto,
    @Param('groupId') groupId: string,
  ): Promise<Message> {
    await this.updateEventGroupUserCase.execute(dto, groupId);
    return { message: 'Successfully update event group!' };
  }

  @ApiException(() => [NotFoundException, UnauthorizedException])
  @Get(':groupId')
  async getGroup(
    @Param('groupId') groupId: string,
  ): Promise<EventGroupDetailDto> {
    return this.getGroupUseCase.execute(groupId);
  }

  @ApiException(() => [NotFoundException, UnauthorizedException])
  @Get()
  async getAllGroups(
    @CurrentUser() user: CurrentUserType,
  ): Promise<ReturnGroupDto[]> {
    return this.getAllGroupsUseCase.execute(user);
  }

  @ApiException(() => [NotFoundException, UnauthorizedException])
  @Delete(':groupId')
  async deleteGroup(@Param('groupId') groupId: string): Promise<Message> {
    await this.deleteEventGroupUseCase.execute(groupId);
    return { message: 'Successfully deleted!' };
  }

  @ApiException(() => [NotFoundException, UnauthorizedException])
  @Put(':groupId/member')
  async addMember(
    @Body() dto: MemberDto,
    @Param('groupId') groupId: string,
  ): Promise<Message> {
    await this.addMemberUseCase.execute(dto.memberId, groupId);
    return { message: 'Successfully add member!' };
  }

  @Delete(':groupId/member/:memberId')
  async deleteMember(
    @Param('groupId') groupId: string,
    @Param('memberId') memberId: string,
  ): Promise<Message> {
    await this.deleteMemberUserCase.execute(memberId, groupId);
    return { message: 'Successfully delete member!' };
  }

  @ApiException(() => [
    UnauthorizedException,
    NotFoundException,
    BadRequestException,
  ])
  @Post(':groupId/expense-record')
  async addExpense(
    @Body() dto: ExpenseDto,
    @Param('groupId') groupId: string,
  ): Promise<Message> {
    await this.addExpenseUseCase.execute(dto, groupId);
    return { message: 'Successfully add expense record!' };
  }

  @ApiException(() => [
    UnauthorizedException,
    NotFoundException,
    BadRequestException,
  ])
  @Put(':groupId/expense-record/:expenseId')
  async updateExpense(
    @Body() dto: ExpenseDto,
    @Param('groupId') groupId: string,
    @Param('expenseId') expenseId: string,
  ): Promise<Message> {
    await this.updateExpenseUseCase.execute(dto, groupId, expenseId);
    return { message: 'Successfully update expense record!' };
  }

  @ApiException(() => [
    UnauthorizedException,
    NotFoundException,
    BadRequestException,
  ])
  @Delete(':groupId/expense-record/:expenseId')
  async deleteExpense(
    @Param('groupId') groupId: string,
    @Param('expenseId') expenseId: string,
  ): Promise<Message> {
    await this.deleteExpenseUseCase.execute(groupId, expenseId);
    return { message: 'Successfully delete expense record' };
  }
}
