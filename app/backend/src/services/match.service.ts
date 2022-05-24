import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatch from '../interfaces/matchInterface';

export default class MatchesService {
  private match;

  private team;

  constructor() {
    this.match = Match;
    this.team = Team;
  }

  public getAll = async (inProgress?: string) => {
    const include = [{ model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }];
    if (inProgress === 'true') {
      const result = await this.match.findAll({
        where: { inProgress: true }, include });
      return result;
    }
    if (inProgress === 'false') {
      const result = await this.match.findAll({
        where: { inProgress: false }, include });
      return result;
    }

    const result = await this.match.findAll({ include });
    return result;
  };

  public create = async (newMatch: IMatch) => {
    const { homeTeam, awayTeam } = newMatch;
    if (homeTeam === awayTeam) {
      return {
        code: 401,
        body: { message: 'It is not possible to create a match with two equal teams' },
      };
    }
    const existHomeTeam = await this.team.findOne({ where: { id: homeTeam } });
    const existAwayTeam = await this.team.findOne({ where: { id: awayTeam } });
    if (!existHomeTeam || !existAwayTeam) {
      return { code: 404, body: { message: 'There is no team with such id!' } };
    }
    const createdNewMatch = await this.match.create(newMatch);
    return { code: 201, body: createdNewMatch };
  };
}
