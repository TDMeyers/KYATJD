import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from '../../api'
import { TopicArr } from "./Topic"


function Index({ user }) {

    const [posts, setPosts] = useState([])
    const [quotes, setQuotes] = useState([])

    const navigate = useNavigate()

    async function getPosts() {
        try {
            console.log('v1.00')
            const response = await axios.get('/api/posts')
            setPosts(response.data)
        } catch(err) {
            console.log(err)
        }
    }

    async function getQuotes() {
        try {
            const response = await axios.get(
            `https://api.api-ninjas.com/v1/quotes?category=${TopicArr[Math.floor(Math.random()*48)]}`,
            {
                headers: { "X-Api-Key": import.meta.env.VITE_APP_RANDOM_USERS_API_KEY  },
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

                        {posts.map((post, index) => 
                            <div className="a-post" key={index}>
                                <Link to={`/posts/${post._id}`}>{post.subject}</Link>
                            </div>
                        )}
            
                        {
                        quotes.map((quote, index) => 
                        <div className="a-post" key={index}>
                            <Link to={`/posts/${quote}`}>{quote.quote}</Link>
                        </div>)
                        }
             
                    {user && 
                        <button onClick={() => navigate('/posts/new')}>NEW POST</button>
                    }
               
                </div>
            </>
    )
}

export default Index