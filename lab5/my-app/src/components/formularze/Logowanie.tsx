import { useState } from "react";

export default function Logowanie() {
    const [nazwaUzyt, setNazwaUzyt] = useState('');
    const [haslo, setHaslo] = useState('');
    const [powtorzHaslo, setPowtorzHaslo] = useState('');

    const login = () => {
        if (haslo !== powtorzHaslo) alert('Hasła nie są zgodne');
        else alert('Zalogowano poprawnie');
    };

    const czyWypelnione = nazwaUzyt !== '' && haslo !== '' && powtorzHaslo !== '';

    return (
        <div>
            <label>Nazwa użytkownika: </label>
            <input type="text" value={nazwaUzyt} placeholder="Wpisz nazwę użytkownika"
            onChange={
                (e) => setNazwaUzyt(e.target.value)
            } />
            <br />
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
            <br/>
            <button onClick={login} disabled={!czyWypelnione}>Logowanie</button>
        </div>
    );
}