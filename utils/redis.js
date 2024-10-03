import redis from 'redis';

class RedisClient {

    constructor() {
        this.client = redis.createClient();
        this.client.on('error', (error) => console.log(error.message));
    }

    isAlive() {
        return this.client.connected;  
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (error, reply) => {
                if (error) {
                    reject(error);
                    return
                }
                resolve(reply);
            })
        });
    }
    
    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.setex(key, duration, value, 
                (error, reply) => {
                    if (error) {
                        reject(error);
                }
                resolve(reply);
            })
        });
    }

    async del(key) {
        await client.del(key);
    }
}

const redisClient = new RedisClient();

module.exports = redisClient;
