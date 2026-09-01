import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { ProductPhoto } from "./ProductPhoto";
import { ProductSize } from "./ProductSize";
import { ProductFlavor } from "./ProductFlavor";

@Entity("products")
export class Product {
  @PrimaryColumn({ type: "varchar", length: 50 })
  id!: string;

  @Column({ type: "varchar", length: 200 })
  name!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  price!: number;

  @Column({ type: "decimal", precision: 12, scale: 2, nullable: true })
  precioCompra!: number;

  @Column({ type: "varchar", length: 500 })
  image!: string;

  @Column({ type: "varchar", length: 100 })
  category!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  subcategory!: string;

  @Column({ type: "decimal", precision: 3, scale: 1, default: 0 })
  rating!: number;

  @Column({ type: "int", default: 0 })
  reviews!: number;

  @Column({ type: "boolean", default: true })
  inStock!: boolean;

  @Column({ type: "simple-json", nullable: true })
  tags!: string[];

  @Column({ type: "int", default: 0 })
  puntosFit!: number;

  @Column({ type: "int", nullable: true })
  servicios!: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  companyId!: string;

  @Column({ type: "boolean", default: true })
  enabled!: boolean;

  @OneToMany(() => ProductPhoto, (p) => p.product, { eager: true })
  fotos!: ProductPhoto[];

  @OneToMany(() => ProductSize, (ps) => ps.product, { eager: true })
  tallas!: ProductSize[];

  @OneToMany(() => ProductFlavor, (pf) => pf.product, { eager: true })
  sabores!: ProductFlavor[];
}
