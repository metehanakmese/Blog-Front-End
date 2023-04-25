import {useState, useEffect} from 'react'
import Post from '../Post/Post'

import { makeStyles } from '@material-ui/core/styles';
import { ClassNames } from '@emotion/react';
import { display } from '@mui/system';

import PostForm from '../Post/PostForm'


const useStyles = makeStyles((theme) => ({
  container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f5ff",
      flexDirection: "row"
  }
}))

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);
  const classes = useStyles();


  
  const refreshPosts = () => {
    fetch("/posts").then(res => res.json()).then(
      (result) => {
          setIsLoaded(true)
          setPostList(result)
          
      },
      (error) => {

          setIsLoaded(true)
          setError(error)
      }
  )
  }


  useEffect(() => {
    refreshPosts()
  }, [])

  if(error){
      return <div>ERROR!!!!</div>
  }else if(!isLoaded){
      return <div>Loading...</div>
  }else{
    
    return (
      <div className= {classes.container}>
        {localStorage.getItem("currentUser") == null ? "" : <PostForm userId = {localStorage.getItem("currentUser")} userName = {localStorage.getItem("userName")} refreshPosts={refreshPosts}/>}
        
        {postList.map((post,index) => (
          <Post key={index}  userId = {post.userId}userName = {post.userName} title= {post.title} text={post.text} postId={post.id} likes={post.postLikes}></Post>
        ))}
      </div>
    )
  }

}

export default Home;