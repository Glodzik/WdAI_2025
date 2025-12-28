import { useState } from "react";

export default function Licznik() {
    const [licznik, setLicznik] = useState(0);

    return (
        <div>
            <h3>Licznik: {licznik}</h3>
            <button onClick={() => setLicznik(licznik + 1)}>Dodaj</button>
        </div>
    )
}