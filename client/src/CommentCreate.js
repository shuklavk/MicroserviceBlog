import React, {useState} from 'react';
import axios from 'axios';

export default ({postId})=>{
  const [content, setContent] = useState('');

  const onSubmit = async (e) =>{
    e.preventDefault();
    await axios.post(`http://posts.com/graphql?query=mutation{postComment(postId:"${postId}", content:"${content}"){id content}}`);
    setContent('');
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input className="form-control" value={content} onChange={(e) => {setContent(e.target.value)}}>
          </input>
        </div>
        <button className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}