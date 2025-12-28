import { useState, useEffect } from "react";

export default function Tytul() {
    const [tytul, setTytul] = useState('');

    useEffect(() => {
        document.title = tytul
    }, [tytul]);

    return (
        <div>
            <label>Tytuł strony: </label>
            <input type="text" placeholder="Wpisz tytuł strony" onChange={(e) => setTytul(e.target.value)} />
        </div>
    );
}