import { useState } from "react";

interface User {
    id: number;
    username: string;
    fullName: string;
}

interface KomentarzProps {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: User;
}

export default function Komentarz({id, body, postId, likes: inicialLikes, user} : KomentarzProps) {
    const[currentLikes, setCurrentLikes] = useState(inicialLikes);

    const handleLike = () => {
        setCurrentLikes(prev => prev + 1);
    }

    const handleDislike = () => {
        setCurrentLikes(prev => prev - 1);
    }

    return (
    <div style={{padding: '15px', margin: '10px 0',
        border: '1px solid gray', borderRadius: '8px',
        backgroundColor: 'whitesmoke', boxShadow: '0 2px 4px gray'}}>
            
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div>
                <div style={{ fontWeight: 'bold' }}>{user.fullName}</div>
                <div style={{ fontSize: '14px', color: 'gray' }}>@{user.username}</div>
            </div>
        </div>
      
        <p style={{ margin: '10px 0' }}>{body}</p>
      
        <div style={{ display: 'flex', justifyContent: 'space-between', 
            alignItems: 'center',marginTop: '20px',}}>
            <div style={{ fontSize: '14px', color: 'gray' }}>Post ID: {postId}; Komentarz ID: {id}</div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handleDislike}
                    style={{padding: '8px', backgroundColor: 'red',
                    color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                    Dislike
                </button>
                
                <div style={{ padding: '5px 15px', backgroundColor: 'white',
                    border: '1px solid lightgray', borderRadius: '20px', fontWeight: 'bold' }}>
                    {currentLikes} Likes
                </div>
                
                <button
                    onClick={handleLike}
                    style={{ padding: '8px', backgroundColor: 'green',
                    color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                    Like
                </button>
            </div>
      </div>
    </div>
  );
}