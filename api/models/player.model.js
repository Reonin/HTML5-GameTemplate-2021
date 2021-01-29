module.exports = (sequelize, Sequelize) => {
    const Player = sequelize.define("players", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      player: {
        type: Sequelize.STRING
      },
      x: {
        type: Sequelize.INTEGER
      },
      y: {
        type: Sequelize.INTEGER
      },
    });
  
    return Player;
  };