export class SignupDto {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role?: 'user' | 'admin'; // rôle optionnel, par défaut 'user'
}
