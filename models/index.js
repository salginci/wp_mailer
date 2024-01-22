const Sequelize = require("sequelize");



var dbHost=process.env.DB_HOST;
var dbPort=process.env.DB_PORT;
var dbUser=process.env.DB_USER;
var dbPass=process.env.DB_PASSWORD;
var dialect= "mysql";

var memberDatabase="ClientMember";
var projectDatabase="Project";
var clientDatabase="Client";
var clientBranchDatabase="Client";
var notificationDatabase="PlatformMessage";



const notificationconfigsequelize = new Sequelize(
  notificationDatabase,
  dbUser,
  dbPass,
  {
    host: dbHost,
    dialect: dialect,
    operatorsAliases: '0',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);


const projectconfigsequelize = new Sequelize(
  projectDatabase,
  dbUser,
  dbPass,
  {
    host:dbHost,
    dialect: dialect,
    operatorsAliases: '0',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);


const clientmembersequelize = new Sequelize(
  memberDatabase,
  dbUser,
  dbPass,
  {
    host: dbHost,
    dialect: dialect,
    operatorsAliases: '0',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);


const branchsequelize = new Sequelize(
  clientDatabase,
  dbUser,
  dbPass,
  {
    host: dbHost,
    dialect: dialect,
    operatorsAliases: '0',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);


const sequelize = new Sequelize(
  clientDatabase,
  dbUser,
  dbPass,
  {
    host: dbHost,
    dialect: dialect,
    operatorsAliases: '0',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const clientsequelize = new Sequelize(
  clientDatabase,
  dbUser,
  dbPass,
  {
    host: dbHost,
    dialect: dialect,
    operatorsAliases: '0',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.clientsequelize = clientsequelize;
db.clientmembersequelize = clientmembersequelize;
db.user = require("./user.model.js")(sequelize, Sequelize);
 db.role = require("./role.model.js")(clientsequelize, Sequelize);
 db.client = require("./client.model.js")(clientsequelize, Sequelize);
 db.clientsettings = require("./clientsettings.model.js")(clientsequelize, Sequelize);
 db.basemail = require("./emailing.model.js")(clientsequelize, Sequelize);
 db.clientemailtemplates= require("./clientemailtemplates.model.js")(clientsequelize, Sequelize);
 db.branch = require("./branch.model.js")(branchsequelize, Sequelize);
 db.branchdepartment = require("./branchdepartment.model.js")(branchsequelize, Sequelize);

 db.clientfeedback = require("./clientfeedback.model.js")(clientsequelize, Sequelize);
 db.clientemailtemplates =  require("./clientemailtemplates.model.js")(clientsequelize, Sequelize);
 
 
 db.clientcountry = require("./clientcountry.model.js")(branchsequelize, Sequelize);
 db.clientposition = require("./clientposition.model.js")(branchsequelize, Sequelize);
db.clientmember=require("./clientmember.model.js")(clientmembersequelize,Sequelize);

db.clientgroup=require("./clientgroup.model.js")(clientmembersequelize,Sequelize);

db.project=require("./project.model.js")(projectconfigsequelize,Sequelize);

db.platformmessage=require("./platformmessage.model.js")(notificationconfigsequelize,Sequelize);


clientmembersequelize.sync()

 clientsequelize.sync()
 branchsequelize.sync()
 notificationconfigsequelize.sync()


 
 //const Member_Roles = sequelize.define('Member_Roles', {},  );
 

 


 db.clientgroup.members=db.clientgroup.belongsToMany(db.clientmember, {
  through: "GroupMembers",
  foreignKey: "groupId",
  //otherKey: "userId"
});

db.clientmember.groups=  db.clientmember.belongsToMany(db.clientgroup, {
  through: "GroupMembers",
  foreignKey: "memberId",
//  otherKey: "roleId"
});


 db.client.hasOne( db.clientsettings);
 db.clientsettings.belongsTo( db.client );


 db.client.templates=db.basemail.belongsToMany(db.clientemailtemplates, {
  through: "Client_Mail_Templates",
  foreignKey: "baseemailId",
  //otherKey: "userId"
});


 db.client.hasMany( db.clientemailtemplates);
 db.clientemailtemplates.belongsTo( db.client );


 db.role.users=db.role.belongsToMany(db.user, {
   through: "Member_Roles",
   foreignKey: "roleId",
   //otherKey: "userId"
 });
 
 db.user.roles=  db.user.belongsToMany(db.role, {
   through: "Member_Roles",
   foreignKey: "userId",
 //  otherKey: "roleId"
 });


 db.branch.hasMany(db.branchdepartment, { as: 'departments',
 foreignKey: 'branchId'
});

 


 
//db.ROLES = ["user", "student", "trainer", "admin", "superadmin","client","member","department","clientmember"];
module.exports = db;