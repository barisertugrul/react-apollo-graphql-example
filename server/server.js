const {ApolloServer} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
const ArticleModel = require('./models/ArticleModel')

const DB_URI = 'mongodb+srv://blog_admin:test1234@blogcluster.kzyga7g.mongodb.net/blogDB?retryWrites=true&w=majority'

const typeDefs=gql`

    type Article{
        id: ID!,
        title: String!,
        content: String!
    }

    type Query{
        getArticles: [Article]!
        getArticle(id: ID!): Article!
    }

    type Mutation{
        createArticle(title: String!, content: String!): Article!
        removeArticle(id:ID!): String!
    }
`;

const resolvers = {
    Query: {
        async getArticles(){
            const articles= await ArticleModel.find();
            return articles;
        },
        async getArticle(parent, args){
            try {
                const {id} = args;
                return await ArticleModel.findById(id);
            } catch (error) {
                throw new error;
            }
        }
    },

    Mutation: {
        createArticle: async (parent, args) => {
            try {
                const article = {
                    title: args.title,
                    content: args.content
                };

                return await ArticleModel.create(article);
            } catch (error) {
                throw new error;
            }
        },
        removeArticle: async (_, {id}) => {
            try {
                const willBeRemoved = await ArticleModel.findById(id)
                await willBeRemoved.delete()
                return "The article has been successfully deleted."
            } catch (error) {
                throw new error;
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(DB_URI, {useNewUrlParser:true, useUnifiedTopology:true}).then(() => {
    console.log('MongoDB bağlantısı başarılı.');
    return server.listen({port:5000});
}).then((res) => {
    console.log(`Server ${res.url} adresinde çalışıyor.`)
})