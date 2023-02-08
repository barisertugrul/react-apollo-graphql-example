import {BrowserRouter as Routers, Switch, Route} from 'react-router-dom'
import './App.css';
import AddArticle from './components/AddArticle';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import Header from './components/Header';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
//import ApolloClient from 'apollo-boost'
//import {ApolloProvider} from '@apollo/react-hooks'

/*
const client = new ApolloClient({
  uri: 'http://localhost:5000'
})
*/

const client = new ApolloClient({
  uri: 'http://localhost:5000',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Routers>
        <Header />
        <Switch>
          <Route exact path='/' component={ArticleList} />
          <Route path='/add' component={AddArticle} />
          <Route path='/article/:id' component={ArticleDetail} />
        </Switch>
      </Routers>
    </ApolloProvider>
  );
}

export default App;
