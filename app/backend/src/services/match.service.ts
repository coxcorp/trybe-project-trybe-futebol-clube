import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class MatchesService {
  private match;

  constructor() {
    this.match = Match;
  }

  public getAll = async () => {
    const result = await this.match.findAll({
      include: [{ model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });
    return result;
  };
}
