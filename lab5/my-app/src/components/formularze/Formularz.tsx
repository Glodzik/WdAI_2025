import { useState } from "react";

export default function Formularz() {
    const [tekst, setTekst] = useState('');

    return (
        <div>
            <input type="text" value={tekst} placeholder="Wpisz tekst" 
            onChange={
                (e) => setTekst(e.target.value) 
                } />
            <div>{tekst}</div>
        </div>
    );
}