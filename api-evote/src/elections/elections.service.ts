import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Election } from './schemas/election.schema';

@Injectable()
export class ElectionsService implements OnModuleInit {
  constructor(
    @InjectModel(Election.name) private electionModel: Model<Election>,
  ) {}

  async onModuleInit() {
    const count = await this.electionModel.countDocuments();
    if (count === 0) {
      await this.electionModel.insertMany([
        {
          name: 'Elección Nacional 2026',
          level: 'Nacional',
          region: 'Argentina',
          status: 'active',
          candidates: [
            {
              name: 'Javier Milei',
              party: 'La Libertad Avanza',
              category: 'Presidente y Vicepresidente',
            },
            {
              name: 'Victoria Villarruel',
              party: 'La Libertad Avanza',
              category: 'Presidente y Vicepresidente',
            },
          ],
        },
        {
          name: 'Elección Provincial 2026',
          level: 'Provincial',
          region: 'Mendoza',
          status: 'active',
          candidates: [
            {
              name: 'Alfredo Cornejo',
              party: 'Cambia Mendoza',
              category: 'Gobernador y Vicegobernador',
            },
            {
              name: 'Omar De Marchi',
              party: 'La Unión Mendocina',
              category: 'Gobernador y Vicegobernador',
            },
            {
              name: 'Andrés Lombardi',
              party: 'Cambia Mendoza',
              category: 'Diputados Provinciales',
            },
          ],
        },
        {
          name: 'Elección Municipal 2026',
          level: 'Municipal',
          region: 'Maipú',
          status: 'active',
          candidates: [
            {
              name: 'Matías Stevanato',
              party: 'Frente Elegí',
              category: 'Intendente',
            },
          ],
        },
      ]);
    }
  }

  // CORRECCIÓN: Ahora acepta los 4 argumentos (incluyendo date)
  async findAll(status?: string, id?: string, name?: string, date?: string) {
    const filter: any = {};
    if (status && status !== 'all') filter.status = status;
    if (id) filter._id = id;
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (date) filter.date = { $gte: new Date(date) };
    return this.electionModel.find(filter).exec();
  }

  async findCandidatesByElection(id: string, category?: string) {
    const election = await this.electionModel.findById(id).exec();
    if (!election) throw new NotFoundException('Elección no encontrada');
    return category
      ? election.candidates.filter((c) => c.category === category)
      : election.candidates;
  }
}
