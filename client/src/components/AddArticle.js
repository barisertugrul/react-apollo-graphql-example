import React, {useState} from 'react'
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';

const CREATE_ARTICLE = gql`
    mutation createArticle($title: String!, $content: String!){
        createArticle(title: $title, content: $content){
            id, title, content
        }
    }
`;

export default function AddArticle(){

    const [newArticle, setNewArticle] = useState({
        title: '',
        content: ''
    });

    const [createArticle, {loading}] = useMutation(CREATE_ARTICLE, {
        update(proxy, result){
            console.log(result)
        },
        variables:newArticle
    })

    const onChange = (e) => {
        setNewArticle({...newArticle, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        createArticle();
        window.location = '/';
    }

  return (
    <div className='create-article'>
        <form onSubmit={onSubmit} >
            <label htmlFor='title' >Article Title:</label>
            <input type="text" id="title" name="title" onChange={onChange} />

            <label htmlFor='content'>Article Content:</label>
            <textarea type="text" id="content" name="content" onChange={onChange} ></textarea>

            <button>Add Article</button>
        </form>
    </div>
    )
}