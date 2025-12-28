import { useState } from "react";

interface Student {
    imie: string;
    nazwisko: string;
    rocznik: number;
}

interface DodawanieProps {
    onDodajStudenta: (student: Student) => void;
}

export default function Dodawanie({onDodajStudenta} : DodawanieProps) {
    const [nowyStudent, setNowyStudent] = useState<Student>({
        imie: '',
        nazwisko: '',
        rocznik: 2000
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setNowyStudent(prev => ({
            ...prev,
            [name]: name === 'rocznik' ? Number(value) : value
        }));
    };

    const waliduj = (): boolean => {
        var noweBledy: String = "";
    
        if (!nowyStudent.imie.trim()) noweBledy += 'Imię jest wymagane\n';
        if (!nowyStudent.nazwisko.trim()) noweBledy += 'Nazwisko jest wymagane\n';
        if (!nowyStudent.rocznik || nowyStudent.rocznik <= 0) noweBledy += 'Poprawny rocznik jest wymagany\n';
        if (isNaN(nowyStudent.rocznik)) noweBledy += 'Rocznik musi być liczbą\n';
        
        if (noweBledy !== "") alert(noweBledy);
        return noweBledy === '';
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (waliduj()) {
            onDodajStudenta(nowyStudent);
            setNowyStudent({imie: '', nazwisko: '', rocznik: 2000});
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Imię: </label>
                <input type="text" name="imie" value={nowyStudent.imie} onChange={handleChange} />
                <br/>
                <label>Nazwisko: </label>
                <input type="text" name="nazwisko" value={nowyStudent.nazwisko} onChange={handleChange} />
                <br/>
                <label>Rocznik: </label>
                <input type="number" name="rocznik" value={nowyStudent.rocznik} onChange={handleChange} />
                <br/>
                <button type="submit">Dodaj</button>
            </form>
        </div>
    )
}
