export default function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <section className={`mx-auto max-w-[1440px] px-4 md:px-12 lg:px-[80px] ${className}`}>
            {children}
        </section>
    );
}