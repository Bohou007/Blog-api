'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Posts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            uuid: {
                type: Sequelize.STRING,
                unique: true
            },
            slug: {
                type: Sequelize.STRING,
                unique: true
            },
            title: {
                type: Sequelize.STRING
            },
            content: {
                type: Sequelize.TEXT
            },
            image: {
                type: Sequelize.STRING
            },
            view: {
                type: Sequelize.INTEGER
            },
            is_enable: {
                type: Sequelize.BOOLEAN
            },
            is_publish: {
                type: Sequelize.BOOLEAN
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'Users',
                    },
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Posts');
    }
};