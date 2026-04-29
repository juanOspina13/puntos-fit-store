import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("subscriptions")
export class Subscription {
  @PrimaryColumn({ type: "varchar", length: 50 })
  id!: string;

  @Column({ type: "varchar", length: 200 })
  name!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  monthlyPrice!: number;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  originalPrice!: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  discount!: number;

  @Column({ type: "varchar", length: 500 })
  image!: string;

  @Column({ type: "varchar", length: 100 })
  objetivo!: string;

  @Column({ type: "varchar", length: 100 })
  objetivoLabel!: string;

  @Column({ type: "varchar", length: 50, default: "monthly" })
  frequency!: string;

  @Column({ type: "simple-json" })
  includedProducts!: string[];

  @Column({ type: "simple-json" })
  benefits!: string[];

  @Column({ type: "int", default: 0 })
  puntosFit!: number;

  @Column({ type: "decimal", precision: 3, scale: 1, default: 0 })
  rating!: number;

  @Column({ type: "int", default: 0 })
  subscribers!: number;

  @Column({ type: "simple-json", nullable: true })
  tags!: string[];

  @Column({ type: "varchar", length: 100, nullable: true })
  icon!: string;

  @Column({ type: "boolean", default: true })
  enabled!: boolean;
}
