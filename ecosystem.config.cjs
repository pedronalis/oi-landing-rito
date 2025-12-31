/**
 * PM2 Ecosystem Configuration
 * 
 * Para iniciar: pm2 start ecosystem.config.cjs
 * Para parar: pm2 stop ordem-inedita-landing
 * Para reiniciar: pm2 restart ordem-inedita-landing
 * Para ver logs: pm2 logs ordem-inedita-landing
 * Para ver status: pm2 status
 */

module.exports = {
  apps: [
    {
      name: 'ordem-inedita-landing',
      script: 'npm',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      watch: false,
    },
  ],
};

