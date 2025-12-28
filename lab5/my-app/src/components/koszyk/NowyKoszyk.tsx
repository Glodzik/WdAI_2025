import Produkt from "./Produkt";

export default function NowyKoszyk() {
    const produkty = ['jabłko', 'gruszka', 'banan', 'arbuz', 'winogrona'];

    return (
        <div>
            <h3>Koszyk (nowy):</h3>
            {
                produkty.map((nazwa, index) => (
                    <Produkt key={index} nazwa={nazwa} />
                ))
            }
        </div>
    )
}