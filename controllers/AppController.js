const db = require('../utils/db');
const redis = require('../utils/redis');

class AppController {

  static getStatus(req, res) {
     res.status(200).json({ 
       "redis": redis.isAlive(), 
       "db": db.isAlive() 
     });
  }

  static getStats(req, res) {
    Promise.all([db.nbUsers(), 
      db.nbFiles()])
      .then(([usersCount, filesCount]) => {
        res.status(200).json({ 
          users: usersCount, 
          files: filesCount 
        });
      });
  }
}

module.exports = AppController;
