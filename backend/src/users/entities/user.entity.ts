import { Commande } from 'src/commandes/entities/commande.entity';
import { PanierItem } from 'src/panier/entities/panier-item.entity';
import { Produit } from 'src/produits/entities/produit.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export type UserRole = 'admin' | 'user';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
   @OneToMany(() => PanierItem, (panier) => panier.user)
  paniers: PanierItem[];

  @OneToMany(() => Commande,commande=> commande.user)
  commandes:Commande[];
   @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
  role: UserRole;
}
