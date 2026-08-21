import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("companies")
export class Company {
  @PrimaryColumn({ type: "varchar", length: 50 })
  id!: string;

  @Column({ type: "varchar", length: 200 })
  nombre!: string;

  @Column({ type: "text" })
  descripcion!: string;

  @Column({ type: "text" })
  descripcionLarga!: string;

  @Column({ type: "varchar", length: 100, unique: true })
  slug!: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  imagen!: string;

  @Column({ type: "boolean", default: true })
  enabled!: boolean;
}
