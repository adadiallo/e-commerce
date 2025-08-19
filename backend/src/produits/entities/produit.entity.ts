// src/produits/entities/produit.entity.ts
import { Category } from "src/categories/entities/category.entity";
import { PanierItem } from "src/panier/entities/panier-item.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Produit {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  nom:string;

  @Column()
  description:string;

  @Column()
  prix:number;

  @Column({ nullable: true })
  image?:string;

  @OneToMany(() => PanierItem, (panier) => panier.produit)
  paniers: PanierItem[];

  @ManyToOne(() => Category, (category) => category.produits, { onDelete: 'CASCADE' })
  category: Category;

  // ✅ Nouveau champ
  @Column({ default: true })
  isActive: boolean;
}
