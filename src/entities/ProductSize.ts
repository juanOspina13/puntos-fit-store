import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./Product";
import { Size } from "./Size";

@Entity("product_sizes")
export class ProductSize {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, { onDelete: "CASCADE" })
  @JoinColumn({ name: "productId" })
  product!: Product;

  @Column({ type: "varchar", name: "productId", length: 50 })
  productId!: string;

  @ManyToOne(() => Size, { eager: true })
  @JoinColumn({ name: "sizeId" })
  talla!: Size;

  @Column({ type: "int", name: "sizeId" })
  sizeId!: number;

  @Column({ type: "int", default: 0 })
  cantidad!: number;

  @Column({ type: "boolean", default: true })
  enabled!: boolean;
}
