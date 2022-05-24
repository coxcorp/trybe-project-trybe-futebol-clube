import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class MatchesService {
  private match;

  constructor() {
    this.match = Match;
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
}
