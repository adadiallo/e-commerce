import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
async findAll() {
  return this.repo.find(); // Récupère tous les utilisateurs
}
  create(data: Partial<User>) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }
async findById(id: number) {
  return this.repo.findOne({
    where: { id },
    select: ['id', 'email', 'nom','prenom'] // Ajoute les colonnes que tu veux
  });
}
}
