const env = name => process.env[name.toUpperCase()];

module.exports = {

  NODE_ENV: env('node_env') || 'development',

  PORT: env('port') || 3000,

  MONGODB: env('mongodb') || 'mongodb://localhost:27017/chat',

  HTTP_LOG_CONFIG: env('http_log_config') || 'dev',

  REDIS: env('redis_url') || 'redis://127.0.0.1:6379',

  REDIS_EXPIRY: env('redis_expiry') ? Number(env('redis_expiry')) : null || (60 * 5),

};
