import React from 'react'
import gql from 'graphql-tag';
import {useQuery, useMutation} from '@apollo/react-hooks';

const GET_ARTICLE = gql`
    query getArticle($id:ID!){
        getArticle(id: $id){
            id, title, content
        }
    }
`;

const REMOVE_ARTICLE = gql`
    mutation removeArticle($id: ID!) {
        removeArticle(id: $id)
    }
`;

export default function ArticleDetail(props) {

    let id = props.match.params.id

    const {data, loading, error} = useQuery(GET_ARTICLE, {
        variables: {id}
    })

    const [deleteArticle] = useMutation(REMOVE_ARTICLE)

    const onClick = () => {
        deleteArticle({variables: {id}})
        window.location = '/'
    }

  return (
    <div>
        {
            data && (
                <div className='detail content'>
                    <h2>{data.getArticle.title}</h2>
                    <div className='content'>
                        {data.getArticle.content}
                    </div>
                    <a className='remove' onClick={onClick}>Remove</a>
                </div>
            )
        }
    </div>
  )
}
