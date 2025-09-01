export default function WhatsAppFloat() {
    return (
        <a
            href="https://wa.me/5511985008039"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-white hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors"
            aria-label="WhatsApp"
        >
            <img src="/images/icones/whatsapp.svg" alt="WhatsApp" className="w-8 h-8" />
        </a>
    );
}