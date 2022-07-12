import { Sequelize, Model, DataTypes } from 'sequelize';

// const sequelize = new Sequelize('sqlite::memory:');
// const sequelize = new Sequelize('postgres://postgres:postgrespw@localhost:55000');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/database.sqlite'
});


try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export const User = sequelize.define('User', {
    username: {
        'type': DataTypes.STRING,
        'allowNull': true,
    },
    refrashToken: DataTypes.STRING,
    birthday: DataTypes.DATE,
});


await sequelize.sync();
