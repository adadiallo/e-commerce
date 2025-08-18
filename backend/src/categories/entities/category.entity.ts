import { Produit } from "src/produits/entities/produit.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category{
@PrimaryGeneratedColumn()
id:number;
@Column()
nom:string
@OneToMany(() => Produit , (produit) => produit.category)
produits:Produit[];

}