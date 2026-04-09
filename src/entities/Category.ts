import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("categories")
export class Category {
  @PrimaryColumn({ type: "varchar", length: 50 })
  id!: string;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "varchar", length: 100, unique: true })
  slug!: string;

  @Column({ type: "varchar", length: 500 })
  image!: string;

  @Column({ type: "text" })
  description!: string;
}
