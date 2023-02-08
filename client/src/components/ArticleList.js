import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

const GET_ARTICLES = gql`
    query {
        getArticles{
            id,
            title,
            content
        }
    }
`;

export default function ArticleList() {

    const {data, loading, error} = useQuery(GET_ARTICLES);
    let articleTemp;

    if(loading){
        articleTemp = <p>Loading articles...</p>
    }else if(data){
        articleTemp = data.getArticles.map( article => {
            return (
                <div className='articles' key={article.id}>
                    <Link to={`/article/${article.id}`}>
                        {article.title}
                    </Link>
                </div>
            )
        })
    }
  return (
    <div>
        {articleTemp}
    </div>
  )
}
