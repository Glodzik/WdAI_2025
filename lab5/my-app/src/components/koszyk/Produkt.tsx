interface ProduktProps {
    nazwa: string;
}

export default function Produkt({ nazwa }: ProduktProps) {
    return <div>{nazwa}</div>;
}