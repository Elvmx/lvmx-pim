import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import * as bcryptjs from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    default:
      'https://cdn.nlark.com/yuque/0/2020/png/382590/1585836839363-9a772275-c47f-4959-abd5-683e6af80312.png',
  })
  avatar: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  /**
   * 创建用户时 hash 密码
   */
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    console.log('123');
    this.password = bcryptjs.hashSync(this.password, 10);
  }

  /**
   * 比较密码
   * @param password 密码
   */
  async comparePassword(password: string) {
    return bcryptjs.compareSync(password, this.password);
  }
}
