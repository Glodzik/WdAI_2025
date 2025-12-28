import Produkt from "./Produkt";

export default function Koszyk() {
    return (
        <div>
            <h3>Koszyk:</h3>
            <Produkt nazwa="jabłko" />
            <Produkt nazwa="gruszka" />
            <Produkt nazwa="banan" />
            <Produkt nazwa="arbuz" />
            <Produkt nazwa="winogrona" />
        </div>
    )
}