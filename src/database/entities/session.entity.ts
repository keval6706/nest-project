import { ISession } from 'connect-typeorm';
import { BaseEntity, Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({
	name: 'user_sessions',
})
export class SessionEntity extends BaseEntity implements ISession {
	@PrimaryColumn('character varying', { length: 255 })
	id: string;

	@Index()
	@Column({
		type: 'bigint',
	})
	expiredAt: number;

	@Column({
		type: 'text',
	})
	json: string;
}
