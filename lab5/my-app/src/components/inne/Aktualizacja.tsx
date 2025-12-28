import { useState } from "react";

interface Produkt {
    nazwa: string;
    cena: number;
}

export default function Aktualizacja() {
    const [produkt, setProdukt] = useState<Produkt>({
        nazwa: 'Pomidor', 
        cena: 50
    });

    const zmianaCeny = () => {
        setProdukt(prevProdukt => ({
            ...prevProdukt,
            cena: 100
        }))
    }
    
    return (
        <div>
            <div>Aktualnie {produkt.nazwa} kosztuje {produkt.cena} zł</div>
            <button onClick={zmianaCeny}>Zmień cenę</button>
        </div>
    )
}