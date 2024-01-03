

//Here the module exports takes two parameter that helps to initialize the tabel
//instead of creating table manually 
//we use sequlize to automatically create the table
module.exports = (sequelize, DataTypes) => {
    //the type we define is the name of the table
    const AddExpense = sequelize.define("AddExpense", {
        //table columns 
        expenseName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT(8,2),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
    return AddExpense;
}