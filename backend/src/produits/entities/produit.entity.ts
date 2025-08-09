import { PanierItem } from "src/panier/entities/panier-item.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Produit {
    @PrimaryGeneratedColumn ()
    id:number;
    @Column()
    nom:string;
    @Column()
    description:string;
    @Column()
    prix:number;
    @Column()
    image?:string;
    
  @OneToMany(() => PanierItem, (panier) => panier.produit)
  paniers: PanierItem[];
}