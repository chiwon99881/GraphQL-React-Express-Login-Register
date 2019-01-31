import {GraphQLServer} from 'graphql-yoga';
import Sequelize from 'sequelize';
import fetch from 'node-fetch';

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const sequelize = new Sequelize('gql_express_react','root','1234',{
    dialect:'mysql',
    host:'localhost',
    port:9999,
    operatorsAliases:false
})

const UserModel = sequelize.define('user',{
    name: {
        type:Sequelize.STRING,
        primaryKey:true
    },
    password: {
        type:Sequelize.STRING,
        allowNull:false
    }
},{
    tableName:'user',
    timestamps:false
});

sequelize.sync({
    force:false
})
const Model = sequelize.models.user;

const typeDefs = `
    type Query {
        isLoggedIn : Boolean!
    }
    type Mutation {
        login(name:String!,password:String!):Boolean!
    }

`;
const LOGGED_STATE_URL = "http://localhost:5000/page/checkLogged";

const getState = () => {
    return fetch(LOGGED_STATE_URL).then(res => res.json()).then(json => json.isLogged);
}

const resolvers = {
    Query: {
        isLoggedIn:() => getState() 
    },
    Mutation: {
        login:(_,{name,password},ctx) => {
            const thisUser = Model.findOne({
                where:{name,password}
            })
            if(thisUser) {
                ctx.session.isLogged = true;
                ctx.session.name = name;
                return true;
            }
        }
    }
}

const context = req => ({
    session: req.request.session,
});

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context
});

const option = {
    host:'localhost',
    port:9999,
    user:'root',
    password:'1234',
    database:'gql_express_react'
};

const sessionStore = new MySQLStore(option);
server.express.use(session({
    key:'session_cookie_name',
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:false,
    store:sessionStore
}))

server.start(() => console.log("GraphQL Server Running on 4000"));