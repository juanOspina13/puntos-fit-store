import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./Product";

@Entity("product_photos")
export class ProductPhoto {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, (p) => p.fotos, { onDelete: "CASCADE" })
  @JoinColumn({ name: "productId" })
  product!: Product;

  @Column({ type: "varchar", name: "productId", length: 50 })
  productId!: string;

  @Column({ type: "varchar", length: 500 })
  url!: string;

  @Column({ type: "int", default: 0 })
  orden!: number;

  @Column({ type: "boolean", default: true })
  enabled!: boolean;
}
