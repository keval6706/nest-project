const fs = require('fs');
const dotenv = require('dotenv');

const { NODE_ENV } = process.env;
if (!NODE_ENV) {
	throw Error('NODE_ENV is required.');
}

const envConfigs = dotenv.parse(fs.readFileSync(`${process.cwd()}/env/.${NODE_ENV}.env`));
for (const eConfig in envConfigs) {
	process.env[eConfig] = envConfigs[eConfig];
}

const commonConfigs = dotenv.parse(fs.readFileSync(`${process.cwd()}/env/.env`));
for (const config in commonConfigs) {
	process.env[config] = commonConfigs[config];
}

module.exports = {
	type: 'postgres',
	host: process.env.POSTGRES_HOST,
	port: process.env.POSTGRES_PORT,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DATABASE,
	migrationsTableName: 'migrations',
	logging: true,
	autoLoadEntities: true,
	timezone: process.env.TZ,
	entities: ['src/database/entities/**/*.ts'],
	migrations: ['src/database/migrations/**/*.ts'],
	seeds: ['src/database/seeds/**/*.ts'],
	subscribers: ['src/database/subscribers/*.ts'],
	// factories: ['src/database/factories/**/*.ts'],
	cli: {
		migrationsDir: 'src/database/migration',
	},
};
