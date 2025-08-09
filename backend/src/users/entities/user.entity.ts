import { PanierItem } from 'src/panier/entities/panier-item.entity';
import { Produit } from 'src/produits/entities/produit.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ unique: true })
  email: string;
@Column ()
role:string;
  @Column()
  password: string;
   @OneToMany(() => PanierItem, (panier) => panier.user)
  paniers: PanierItem[];

}
