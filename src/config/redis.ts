import { createClient } from 'redis';

const redis = createClient();

redis.on('error', (err) => console.log('Redis Client Error', err));

const connectRedis = async () => await redis.connect();
connectRedis();

export { redis };
