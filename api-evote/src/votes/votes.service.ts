import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vote } from './schemas/vote.schema';

@Injectable()
export class VotesService {
  constructor(@InjectModel(Vote.name) private voteModel: Model<Vote>) {}

  async emitirVoto(voteData: any) {
    const existe = await this.voteModel.findOne({
      userId: voteData.userId,
      category: voteData.category,
    });
    if (existe)
      throw new BadRequestException('Ya has emitido tu voto para este cargo.');
    return new this.voteModel(voteData).save();
  }

  // REQUISITO: Resultados completos con ordenamiento y timestamps
  async obtenerResultadosCompletos() {
    const res = await this.voteModel.aggregate([
      {
        $group: {
          _id: {
            level: '$level',
            category: '$category',
            candidate: '$candidateName',
          },
          votos: { $sum: 1 },
          ultimoVoto: { $max: '$createdAt' },
        },
      },
      {
        $group: {
          _id: { level: '$_id.level', category: '$_id.category' },
          candidatos: {
            $push: {
              nombre: '$_id.candidate',
              votos: '$votos',
              fecha: '$ultimoVoto',
            },
          },
          total: { $sum: '$votos' },
        },
      },
      { $unwind: '$candidatos' },
      { $sort: { 'candidatos.votos': -1 } }, // De mayor a menor
      {
        $group: {
          _id: '$_id',
          candidatos: { $push: '$candidatos' },
          total: { $first: '$total' },
        },
      },
    ]);
    return res;
  }

  async borrarTodosLosVotos() {
    return this.voteModel.deleteMany({});
  }
}
