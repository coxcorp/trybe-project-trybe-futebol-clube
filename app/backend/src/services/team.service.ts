import Team from '../database/models/Team';

export default class TeamsService {
  private team;

  constructor() {
    this.team = Team;
  }

  public getAll = async () => {
    const result = await this.team.findAll();
    return result;
  };

  public getById = async (id: number) => {
    const result = await this.team.findOne({ where: { id } });
    return result;
  };
}
