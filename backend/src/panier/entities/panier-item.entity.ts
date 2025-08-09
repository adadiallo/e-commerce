import { Produit } from "src/produits/entities/produit.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PanierItem {
    @PrimaryGeneratedColumn()
    id:number;
    @ManyToOne(() => User,user => user.paniers, {onDelete:'CASCADE'})
    @JoinColumn({name: 'userId'})
    user:User;
    @ManyToOne(() => Produit,{eager:true})
    @JoinColumn({name: 'produitId'})
    produit:Produit;
    @Column()
    quantite:number;
}