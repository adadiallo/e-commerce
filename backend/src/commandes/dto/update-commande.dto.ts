import { PartialType } from '@nestjs/mapped-types';
import { CreateCommandeDto } from './create-commande.dto';

export class UpdateCommandeDto extends PartialType(CreateCommandeDto) {
     produits?: { produitId: number; nom: string; prix: number; quantite: number }[];
  total?: number;
}
