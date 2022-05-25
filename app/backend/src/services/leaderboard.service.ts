import Team from '../database/models/Team';
import Match from '../database/models/Match';
import ITeam from '../interfaces/teamInterface';
import IMatch from '../interfaces/matchInterface';
import IScore from '../interfaces/scoreInterface';

export default class LeaderboardService {
  private match;

  private team;

  constructor() {
    this.match = Match;
    this.team = Team;
  }

  private inicialScore: IScore = {
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
  };

  private homeResult = (id: number, match: IMatch) => {
    const result = { ...this.inicialScore };
    result.totalGames += 1;
    if (match.homeTeamGoals > match.awayTeamGoals) {
      result.totalVictories += 1;
      result.totalPoints += 3;
    } else if (match.homeTeamGoals === match.awayTeamGoals) {
      result.totalDraws += 1;
      result.totalPoints += 1;
    } else {
      result.totalLosses += 1;
    }
    result.goalsFavor += match.homeTeamGoals;
    result.goalsOwn += match.awayTeamGoals;

    return result;
  };

  private awayResult = (id: number, match: IMatch) => {
    const result = { ...this.inicialScore };
    result.totalGames += 1;
    if (match.awayTeamGoals > match.homeTeamGoals) {
      result.totalVictories += 1;
      result.totalPoints += 3;
    } else if (match.homeTeamGoals === match.awayTeamGoals) {
      result.totalDraws += 1;
      result.totalPoints += 1;
    } else {
      result.totalLosses += 1;
    }
    result.goalsFavor += match.awayTeamGoals;
    result.goalsOwn += match.homeTeamGoals;

    return result;
  };

  private reduceScores = (results: any) =>
    results.reduce((acc: IScore, curr: IScore) => ({
      totalPoints: acc.totalPoints + curr.totalPoints,
      totalGames: acc.totalGames + curr.totalGames,
      totalVictories: acc.totalVictories + curr.totalVictories,
      totalDraws: acc.totalDraws + curr.totalDraws,
      totalLosses: acc.totalLosses + curr.totalLosses,
      goalsFavor: acc.goalsFavor + curr.goalsFavor,
      goalsOwn: acc.goalsOwn + curr.goalsOwn,
    }), this.inicialScore);

  private calculateLeaderboard = (teams: ITeam[], matches: IMatch[], player?: string) =>
    teams.map((team: ITeam) => {
      const results = matches.map((match: IMatch) => {
        if ((player === 'home' || player === 'all') && team.id === match.homeTeam) {
          return this.homeResult(team.id, match);
        }
        if ((player === 'away' || player === 'all') && team.id === match.awayTeam) {
          return this.awayResult(team.id, match);
        }
        return this.inicialScore;
      });
      const score = this.reduceScores(results);
      const efficiency = ((score.totalPoints / (score.totalGames * 3)) * 100).toFixed(2);

      return {
        name: team.teamName,
        ...score,
        goalsBalance: score.goalsFavor - score.goalsOwn,
        efficiency: efficiency.endsWith('.00') ? efficiency.slice(0, -3) : efficiency,
      };
    });

  private sortLeaderboard = (leaderboard: any) => leaderboard.sort((a: any, b: any) => {
    if (b.totalPoints === a.totalPoints && b.goalsBalance === a.goalsBalance) {
      return b.goalsFavor - a.goalsFavor;
    } if (b.totalPoints === a.totalPoints) {
      return b.goalsBalance - a.goalsBalance;
    }
    return b.totalPoints - a.totalPoints;
  });

  public getByPlayerAll = async () => {
    const teams = await Team.findAll();
    const matches = await Match.findAll({
      where: { inProgress: false } });
    const leaderboard = this.calculateLeaderboard(teams, matches, 'all');
    const sortedLeaderboard = this.sortLeaderboard(leaderboard);
    return { code: 200, body: sortedLeaderboard };
  };

  public getByPlayer = async (player?: string) => {
    const teams = await Team.findAll();
    const matches = await Match.findAll({
      where: { inProgress: false } });
    const leaderboard = this.calculateLeaderboard(teams, matches, player);
    const sortedLeaderboard = this.sortLeaderboard(leaderboard);
    return { code: 200, body: sortedLeaderboard };
  };
}
