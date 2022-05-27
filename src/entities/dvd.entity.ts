import { Entity, Column, PrimaryColumn, JoinColumn, OneToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Stock } from "./stock.entity";

@Entity()
export class Dvd {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  duration: string;

  @Column({ nullable: true })
  userQuantity: number;

  @OneToOne((type) => Stock, { eager: true })
  @JoinColumn()
  stock: Stock;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
