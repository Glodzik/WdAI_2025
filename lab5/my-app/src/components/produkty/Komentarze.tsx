import { useState, useEffect, use } from "react";
import Komentarz from "./Komentarz";

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

export default function Komentarze() {
    const [komentarze, setKomentarze] = useState<KomentarzProps[]>([]);

    useEffect(() => {
        fetch('https://dummyjson.com/comments')
            .then(response => response.json())
            .then(data => {
                setKomentarze(data.comments);
            })
            .catch(error => {
                console.error("Błąd pobierania danych: ", error);
            });
    }, []);

    return (
        <div>
            {komentarze.map(komentarz => (
                <Komentarz key={komentarz.id} id={komentarz.id}
                body={komentarz.body} postId={komentarz.postId}
                likes={komentarz.likes} user={komentarz.user} />
            ))}
        </div>
    );
}