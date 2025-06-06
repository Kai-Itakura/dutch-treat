import { Inject, Injectable } from '@nestjs/common';
import { CurrentUserType } from 'src/decorators/types/current-user.type';
import { EventGroup } from '../../domain/entities/event-group.entity';
import {
  EventGroupRepositoryToken,
  IEventGroupRepository,
} from '../../domain/repositories/event-group.repository.interface';
import { EventGroupDto } from '../../presentation/dto/event-group.dto';

@Injectable()
export class CreateEventGroupUseCase {
  constructor(
    @Inject(EventGroupRepositoryToken)
    private readonly eventGroupRepository: IEventGroupRepository,
  ) {}

  async execute(dto: EventGroupDto, user: CurrentUserType): Promise<void> {
    const eventGroup = EventGroup.create(dto.title, user.userId, dto.currency);
    await this.eventGroupRepository.save(eventGroup);
  }
}
