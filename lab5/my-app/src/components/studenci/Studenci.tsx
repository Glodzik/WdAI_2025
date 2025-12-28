interface Student {
    imie: string;
    nazwisko: string;
    rocznik: number;
}

export default function Studenci() {
    const Students: Student[] = [
        {imie: "Jan", nazwisko: "Kowalski", rocznik: 2004},
        {imie: "Robert", nazwisko: "Nowak", rocznik: 2005},
        {imie: "Piotr", nazwisko: "Liber", rocznik: 2000},
        {imie: "Adam", nazwisko: "Małysz", rocznik: 1980},
        {imie: "Jakub", nazwisko: "Lewandowski", rocznik: 2010},
    ];

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
                    {Students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.imie}</td>
                            <td>{student.nazwisko}</td>
                            <td>{student.rocznik}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}