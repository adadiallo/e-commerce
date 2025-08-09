import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('produits')
export class ProduitsController {
constructor(private readonly produitsService: ProduitsService){}
@UseGuards(JwtAuthGuard)
@Post()
create(@Body() dto:CreateProduitDto){
    return this.produitsService.create(dto);
}
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


}
