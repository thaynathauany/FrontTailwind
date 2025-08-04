export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <section className="mx-auto max-w-[1440px] px-4 md:px-12 lg:px-[80px]">
            {children}
        </section>
    );
}