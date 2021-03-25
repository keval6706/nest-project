import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  async beforeInsert(event: InsertEvent<UserEntity>) {
    await this.hashPassword(event.entity);
  }

  async beforeUpdate(event: UpdateEvent<UserEntity>) {
    await this.hashPassword(event.entity);
  }

  async hashPassword(user: UserEntity) {
    if (user && user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }
}
