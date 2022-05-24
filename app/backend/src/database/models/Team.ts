import { DataTypes, Model } from 'sequelize';
import db from '.';

class Team extends Model {
  declare id: number;

  declare teamName: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'team',
  tableName: 'teams',
  timestamps: false,
});

export default Team;
