import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('produits')
export class ProduitsController {
  constructor(
    private readonly produitsService: ProduitsService,
    private readonly cloudinaryService: CloudinaryService, // ✅ injection ici
  ) {}

@Get()
findAll(){
    return this.produitsService.findAll();
}

@Get(':id')
findOne(@Param('id') id: string){
    return this.produitsService.findOne(+id);
}
@UseGuards(JwtAuthGuard)

@Patch(':id')
update(@Param('id') id:string, @Body() dto:UpdateProduitDto){
    return this.produitsService.update(+id,dto)
}
@UseGuards(JwtAuthGuard)

@Delete(':id')
remove(@Param('id') id: string){
    return this.produitsService.remove(+id);
}
@UseGuards(JwtAuthGuard)

@Post()
@UseInterceptors(FileInterceptor('image'))
async create(@Body() dto: CreateProduitDto, @UploadedFile() file: Express.Multer.File) {
  try {
    console.log('DTO:', dto);
    console.log('File:', file);

    if (!file) throw new Error('Aucun fichier reçu');

    const result = await this.cloudinaryService.uploadImage(file);
    dto.image = result.secure_url;

    return this.produitsService.create(dto);
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
    throw error; // NestJS affichera l’erreur exacte
  }
}


}
