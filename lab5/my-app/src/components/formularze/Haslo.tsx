import { useState } from "react";

export default function Haslo() {
    const [haslo, setHaslo] = useState('');
    const [powtorzHaslo, setPowtorzHaslo] = useState('');

    const getMessage = () => {
        if(!haslo && !powtorzHaslo) return 'Proszę wprowadzić hasło';
        if (haslo !== powtorzHaslo) return 'Hasła nie są zgodne';
        return '';
    };

    return (
        <div>
            <label>Hasło: </label>
            <input type="password" value={haslo} placeholder="Wpisz hasło"
            onChange={
                (e) => setHaslo(e.target.value)
            } />
            <br />
            <label>Powtórz hasło: </label>
            <input type="password" value={powtorzHaslo} placeholder="Powtórz hasło"
            onChange={
                (e) => setPowtorzHaslo(e.target.value)
            } />
            <div>{ getMessage() }</div>
        </div>
    );
}