import Container from "@/components/ui/Container";
import Image from "next/image";

export default function Benefits({ t }: { t: (key: string) => string }) {
    const items = [
        {
            icon: "/images/icones/money-icon.png",
            title: t("benefits.tarifasBaixasTitulo"),
            desc: t("benefits.tarifasBaixasDescricao"),
        },
        {
            icon: "/images/icones/rapidez-icon.png",
            title: t("benefits.rapidezTitulo"),
            desc: t("benefits.rapidezDescricao"),
        },
        {
            icon: "/images/icones/transparencia-icon.png",
            title: t("benefits.transparenciaTitulo"),
            desc: t("benefits.transparenciaDescricao"),
        },
    ];

    return (
        <Container>
            <div className="flex flex-col lg:flex-row items-start gap-6 mb-4 p-4 mt-10">
                {items.map((b, i) => (
                    <div key={i} className="max-w-[400px]">
                        <div className="flex items-center gap-2 mb-2">
                            <Image src={b.icon} alt="" width={24} height={24} />
                            <h3 className="text-secondary font-bold text-lg">{b.title}</h3>
                        </div>
                        <p className="text-primary text-sm">{b.desc}</p>
                    </div>
                ))}
            </div>
        </Container>
    );
}