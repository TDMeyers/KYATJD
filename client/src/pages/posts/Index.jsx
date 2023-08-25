import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from '../../api'
import { TopicArr } from "./Topic"
import PostForm from "../../components/PostForm"
import { useSelector } from "react-redux";



function Index({children}) {


    const user = useSelector(state => state.user)

    const [posts, setPosts] = useState([])
    const [quotes, setQuotes] = useState([])

    const navigate = useNavigate()

    async function getPosts() {
        try {
            // console.log('v1.00')
            const response = await axios.get('/api/posts')
            setPosts(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    async function getQuotes() {
        try {
            const response = await axios.get(
                `https://api.api-ninjas.com/v1/quotes?category=${TopicArr[Math.floor(Math.random() * 48)]}`,
                {
                    headers: { "X-Api-Key": import.meta.env.VITE_APP_RANDOM_USERS_API_KEY },
                }
            );
            const data = await response.data;
            console.log(data)
            setQuotes(data)
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getPosts()
        getQuotes()
    }, [])

    return (
        <>
            <h1>Index View</h1>
            <div id="posts">
        {children}
                {posts.map((post, index) =>
                    <div className="a-post" key={index}>
                                
                    <PostForm Text={post.subject} Comments={`/posts/${post._id}`} />
                  

              </div>
                )}

                {
                    quotes.map((quote, index) =>
                        <div className="a-post" key={index}>
                            <Link to={`/posts/${quote}`}>{quote.quote}</Link>
                        </div>)
                }

                {user?.username &&
                    <button onClick={() => navigate('/posts/new')}>NEW POST</button>
                }

                {posts.map((post, index) =>
                    <div className="a-post" key={index}>
                        <Link to={`/posts/${post._id}`}>{post.subject}</Link>
                    </div>
                )}


                {user.username &&
                    <button onClick={() => navigate('/posts/new')}>NEW POST</button>
                }

            </div>
        </>
    )
}

export default Index

////
// import React, { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// import axios from '../../api';

// function Index({ user }) {
//     const [allPosts, setAllPosts] = useState([]);
//     const [search, setSearch] = useState("");

//     const navigate = useNavigate();

//     async function getPosts() {
//         try {
//             const response = await axios.get(`/api/posts`);
//             setAllPosts(response.data);
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     useEffect(() => {
//         getPosts();
//     }, []);

//     const filteredPosts = allPosts.filter(post =>
//         post.subject.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <>
//             <h1>Index View</h1>
//             <div id="posts">
//                 <input
//                     type="text"
//                     placeholder="Search posts"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />
//                 <button onClick={() => setSearch("")}>Clear</button>
//                 {filteredPosts && filteredPosts.length > 0 ? (
//            filteredPosts.map((post, index) => (
//         <div className="a-post" key={index}>
//             <Link to={`/posts/${post._id}`}>{post.subject}</Link>
//         </div>
//     ))
// ) : (
//     <p>No posts found.</p>
// )}

//                 {user && (
//                     <button onClick={() => navigate('/posts/new')}>NEW POST</button>
//                 )}
//             </div>
//         </>
//     );
// }

// export default Index;
