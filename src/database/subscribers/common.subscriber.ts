import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  ObjectLiteral,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import * as moment from 'moment';

@EventSubscriber()
export class CommonSubscriber<Entity extends ObjectLiteral>
  implements EntitySubscriberInterface<Entity & ObjectLiteral> {
  /**
   * Called before post insertion.
   */
  beforeInsert(event: InsertEvent<any>) {
    const now: string = moment().toDate().toISOString();
    if (event.metadata.propertiesMap.hasOwnProperty('createdAt')) {
      event.entity.createdAt = now;
    }
    if (event.metadata.propertiesMap.hasOwnProperty('updatedAt')) {
      event.entity.updatedAt = now;
    }
  }

  /**
   * Called before entity update.
   */
  beforeUpdate(event: UpdateEvent<any>) {
    if (event.metadata.propertiesMap.hasOwnProperty('updatedAt')) {
      const now: string = moment().toDate().toISOString();
      event.entity.updatedAt = now;
    }
  }

  /**
   * Called before entity removal.
   */
  beforeRemove(event: RemoveEvent<any>) {
    if (event.metadata.propertiesMap.hasOwnProperty('deletedAt')) {
      const now: string = moment().toDate().toISOString();
      event.entity.deletedAt = now;
    }
  }
}
