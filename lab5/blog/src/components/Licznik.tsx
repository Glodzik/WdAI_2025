import { useState, useEffect } from "react";

export default function Licznik() {
    const licznikValue = localStorage.getItem('licznik');
    const inicialValue = licznikValue ? parseInt(licznikValue, 10) : 0;

    const [licznik, setLicznik] = useState(inicialValue);

    useEffect(() => {
        localStorage.setItem('licznik', licznik.toString());
    }, [licznik]);

    return (
        <div>
            <h3>Licznik: {licznik}</h3>
            <button onClick={() => setLicznik(licznik + 1)}>Dodaj</button>
        </div>
    )
}