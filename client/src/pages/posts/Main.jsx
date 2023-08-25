import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Index from './Index'
import axios from 'axios';
export default function main() {
      const [allPosts, setAllPosts] = useState([]);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    async function getPosts() {
        try {
            const response = await axios.get(`/api/posts`);
            setAllPosts(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    const filteredPosts = allPosts.filter(post =>
        post.subject.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div>
      {search.length>0?(
        <>
  <input
  type="text"
  placeholder="Search posts"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
  <h1>Index View</h1>
              <div id="posts">
        
                  <button onClick={() => setSearch("")}>Clear</button>
                  {filteredPosts && filteredPosts.length > 0 ? (
             filteredPosts.map((post, index) => (
          <div className="a-post" key={index}>
              <Link to={`/posts/${post._id}`}>{post.subject}</Link>
          </div>
             ))):<p>No posts found.</p>}

             </div>
             </>
 
      ):(
        <Index >
        <input
                    type="text"
                    placeholder="Search posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
      </Index>
      )}
    
      
      </div>
  )
}
