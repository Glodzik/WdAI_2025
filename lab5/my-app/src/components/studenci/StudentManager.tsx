import { useState } from "react";
import Dodawanie from "./Dodawanie";

interface Student {
    imie: string;
    nazwisko: string;
    rocznik: number;
}

export default function StudentManager() {
    const [students, setStudents] = useState<Student[]>([
        {imie: "Jan", nazwisko: "Kowalski", rocznik: 2004},
        {imie: "Robert", nazwisko: "Nowak", rocznik: 2005},
        {imie: "Piotr", nazwisko: "Liber", rocznik: 2000},
        {imie: "Adam", nazwisko: "Małysz", rocznik: 1980},
        {imie: "Jakub", nazwisko: "Lewandowski", rocznik: 2010},
    ]);

    const dodajStudenta = (nowyStudent: Student) => {
        setStudents(prev => [...prev, nowyStudent])
    }

    return (
        <div>
            <table style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Rocznik</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.imie}</td>
                            <td>{student.nazwisko}</td>
                            <td>{student.rocznik}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Dodawanie onDodajStudenta={dodajStudenta} />
        </div>
    )
}