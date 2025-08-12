export class CreateCommandeDto {
     produits: { produitId: number; nom: string; prix: number; quantite: number }[];
  total: number;
}
