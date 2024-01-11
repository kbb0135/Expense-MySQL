

//Here the module exports takes two parameter that helps to initialize the tabel
//instead of creating table manually 
//we use sequlize to automatically create the table
module.exports = (sequelize, DataTypes) => {
    //the type we define is the name of the table
    const Users = sequelize.define("Users", {

        //table columns 
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        
    })
   // creating interface to create database on the basis of users added
    Users.associate = (models) => {
        Users.hasMany(models.AddExpense), {
            onDelete:"cascade",
        },
        Users.hasMany(models.AddSaving), {
            onDelete:"cascade",
        }
    }
    return Users;
}