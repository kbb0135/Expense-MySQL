//Creating a seperate table to ensure that there is a saving in our databases
module.exports = (sequelize, DataTypes) => {
    const AddSaving = sequelize.define("AddSaving", {
        saving: {
            type: DataTypes.FLOAT(8, 2),
            allowNull: false,
        }
    })
    return AddSaving;
}