import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Commande {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.commandes, { onDelete: 'CASCADE' })
  user: User;

  @Column('json')
  produits: { produit: any; quantite: number }[];

  @Column()
  total: number;

  @Column({ default: 'en attente' })
  statut: string;
}
