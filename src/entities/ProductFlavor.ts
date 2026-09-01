import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./Product";
import { Flavor } from "./Flavor";

@Entity("product_flavors")
export class ProductFlavor {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, { onDelete: "CASCADE" })
  @JoinColumn({ name: "productId" })
  product!: Product;

  @Column({ type: "varchar", name: "productId", length: 50 })
  productId!: string;

  @ManyToOne(() => Flavor, { eager: true })
  @JoinColumn({ name: "flavorId" })
  sabor!: Flavor;

  @Column({ type: "int", name: "flavorId" })
  flavorId!: number;

  @Column({ type: "int", default: 0 })
  servings!: number;

  @Column({ type: "int", default: 0 })
  cantidad!: number;

  @Column({ type: "boolean", default: true })
  enabled!: boolean;
}
