import { useEffect, useState } from "react";

export default function LicznikEfekt() {
    const [licznik, setLicznik] = useState(0);

    useEffect(() => {
        console.log('Hello world');
    }, []);

    useEffect(() => {
        if(licznik > 0) {
            console.log(`Licznik zwiększył się do ${licznik}`);
        }
    }, [licznik]);

    return (
        <div>
            <h3>Licznik: {licznik}</h3>
            <button onClick={() => setLicznik(licznik + 1)}>Dodaj</button>
        </div>
    )
}