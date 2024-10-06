const db = require('../utils/db');
const sha1 = require('sha1');


class UsersController {

  static hashPassword(password) {
    return sha1(password);
  }

  static async createUser(req, res) {
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;

    // Input validation
    if (!email) {
      return res.status(400).json('Missing email');
    }
    if (!password) {
      return res.status(400).json('Missing Password');
    }
    // Check if the email exists
    const emailExists = await db.checkEmail(email);
      if (emailExists) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      const uPassword = UsersController.hashPassword(password);

      const data = await db.client.db().collection('users')
      .insertOne({ 'email': email, 'password': uPassword });

    try {
      
      // Insert user into the database
     
        
      const userId = data.insertedId.toString();
      
      res.status(201).json({'id': userId, 'email': email});
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

}

module.exports = UsersController;
