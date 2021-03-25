import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({
  name: 'users',
})
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp with time zone',
  })
  updatedAt: Date;

  @Column({
    type: 'timestamp with time zone',
  })
  verifiedAt: Date;

  @Column({
    type: 'boolean',
  })
  status: boolean;

  async validatePassword(password: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(password, this.password);
      if (!isMatch) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
