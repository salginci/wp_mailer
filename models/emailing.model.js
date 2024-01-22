module.exports = (sequelize, Sequelize) => {
    const BaseMail = sequelize.define("BaseMail", {
      
     
      emailKey: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      required: {
        type: Sequelize.STRING
      },
      key_holders: {
        type: Sequelize.JSON
      },
       
       
      title: {
        type: Sequelize.STRING},
      
       
    }
    )
    ;
    return BaseMail;
  };