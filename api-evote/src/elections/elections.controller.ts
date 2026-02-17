import { Controller, Get, Query, Param } from '@nestjs/common';
import { ElectionsService } from './elections.service';

@Controller('elections')
export class ElectionsController {
  constructor(private readonly electionsService: ElectionsService) {}

  @Get()
  async findAll(
    @Query('status') status?: string,
    @Query('id') id?: string,
    @Query('name') name?: string,
    @Query('date') date?: string,
  ) {
    return this.electionsService.findAll(status, id, name, date);
  }

  @Get(':id/candidates')
  async findCandidates(
    @Param('id') id: string,
    @Query('category') category?: string, // TypeScript ahora acepta string | undefined
  ) {
    return this.electionsService.findCandidatesByElection(id, category);
  }
}
