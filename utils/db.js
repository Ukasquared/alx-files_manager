import { MongoClient } from 'mongodb';


class DBClient {

    constructor() {
        this.localhost = process.env.DB_HOST ? process.env.DB_HOST : 'localhost'
        this.port = process.env.DB_PORT ? process.env.DB_PORT : '27017'
        this.database = process.env.DB_DATABASE ? process.env.DB_DATABASE : 'files_manager'
        this.dbUrl = `mongodb://${this.localhost}:${this.port}`;
 
        this.client =  new MongoClient(this.dbUrl, { useUnifiedTopology: true});
        this.client.connect();
    }

    isAlive() {
       return this.client.topology.isConnected();
    }

    async nbUsers() {
        return this.client.db()
          .collection('users').countDocuments();

    }

    async nbFiles() {
        return this.client.db()
          .collection('files').countDocuments();
    
    }

    async checkEmail(email) {
        const trueOrFalse = await (await this.client.db()
        .collection('users')).findOne({'email': email});
        return trueOrFalse;
    }
}

const dbClient = new DBClient()

module.exports = dbClient;
