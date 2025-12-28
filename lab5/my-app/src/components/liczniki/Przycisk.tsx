interface PrzyciskProps {
    zwieksz: () => void
}

export default function Przycisk({ zwieksz } : PrzyciskProps) {
    return (
        <button onClick={zwieksz}>Dodaj</button>
    )
}