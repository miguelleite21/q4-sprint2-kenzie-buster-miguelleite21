import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Dvd } from "./dvd.entity";
import { User } from "./user.entity";

@Entity()
export class Cart {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  paid: boolean;

  @Column("float")
  total: number;

  @ManyToOne((type) => User, (user) => user.carts)
  user: User;

  @ManyToMany((type) => Dvd, {
    eager: true,
  })
  @JoinTable()
  dvd: Dvd[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
