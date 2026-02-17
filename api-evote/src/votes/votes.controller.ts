import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { VotesService } from './votes.service';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  async emitirVoto(@Body() body: any) {
    return this.votesService.emitirVoto(body);
  }

  @Get('resultados')
  async obtenerResultados() {
    // CORRECCIÓN: Usamos el nombre correcto de la función del servicio
    return this.votesService.obtenerResultadosCompletos();
  }

  @Delete('clear')
  async borrarVotos() {
    return this.votesService.borrarTodosLosVotos();
  }
}
