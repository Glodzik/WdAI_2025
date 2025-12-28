import React from 'react';
import './App.css';

import Koszyk from './components/koszyk/Koszyk';
import NowyKoszyk from './components/koszyk/NowyKoszyk';
import Licznik from './components/liczniki/Licznik';
import NowyLicznik from './components/liczniki/NowyLicznik';
import Formularz from './components/formularze/Formularz';
import Haslo from './components/formularze/Haslo';
import Logowanie from './components/formularze/Logowanie';
import Ternary from './components/inne/Ternary';
import Aktualizacja from './components/inne/Aktualizacja';
import Studenci from './components/studenci/Studenci';
import StudentManager from './components/studenci/StudentManager';
import LicznikEfekt from './components/efekty/LicznikEfekt';
import Tytul from './components/efekty/Tytul';
import Odliczanie from './components/efekty/Odliczanie';
import Komentarz from './components/produkty/Komentarz';
import Komentarze from './components/produkty/Komentarze';

function App() {
    return (
        <div className="App">
            <h2 className='Task'>Zadanie 1.</h2>
            <Koszyk />
            <NowyKoszyk />

            <h2 className='Task'>Zadanie 2.</h2>
            <Licznik />
            <NowyLicznik />

            <h2 className='Task'>Zadanie 3.</h2>
            <Formularz />
            <br/>
            <Haslo />
            <br/>
            <Logowanie />

            <h2 className='Task'>Zadanie 4.</h2>
            <Ternary />
            <br/>
            <Aktualizacja />

            <h2 className='Task'>Zadanie 5.</h2>
            <Studenci />
            <br/>
            <StudentManager />

            <h2 className='Task'>Zadanie 6.</h2>
            <LicznikEfekt />
            <br />
            <Tytul />
            <br />
            <Odliczanie />

            <h2 className='Task'>Zadanie 7.</h2>
            <Komentarze />
        </div>
    );
}

export default App;