"use client";

import Container from "@/components/ui/Container";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

export default function ContactSection() {
    const t = useTranslations("Contact");

    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", form);
        // Integração com API vai aqui
    };

    return (
        <section className="w-full py-10 px-4 pt-30 md:pt-[150px] flex items-center">
            <Container>
                <h2 className="text-secondary text-2xl md:text-4xl font-semibold text-center mb-12">
                    {t("title")}
                </h2>
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-y-8 md:gap-x-20">
                    {/* Lado esquerdo */}
                    <div className="flex-1 max-w-[320px] space-y-6">
                        <div className="flex items-start gap-4">
                            <img src="/images/icones/mail.png" alt="Email Icon" className="w-6 h-6 mt-1" />
                            <div>
                                <p className="font-bold text-primary">{t("emailLabel")}</p>
                                <p className="text-primary">dinerolatam@dinerolatam.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <img src="/images/icones/phone.png" alt="Phone Icon" className="w-6 h-6 mt-1" />
                            <div>
                                <p className="font-bold text-primary">{t("phoneLabel")}</p>
                                <p className="text-primary">+52 12 3456-7890</p>
                            </div>
                        </div>
                        <a
                            href="https://wa.me/521234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mx-auto md:mx-0 text-center w-fit bg-secondary text-white px-6 py-2 rounded-full font-medium mt-4"
                        >
                            {t("whatsappButton")}
                        </a>
                    </div>

                    {/* Formulário */}
                    <form onSubmit={handleSubmit} className="flex-1 max-w-[320px] space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder={t("placeholder.name")}
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-secondary"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder={t("placeholder.email")}
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-secondary"
                            required
                        />
                        <input
                            type="text"
                            name="subject"
                            placeholder={t("placeholder.subject")}
                            value={form.subject}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-secondary"
                        />
                        <textarea
                            name="message"
                            placeholder={t("placeholder.message")}
                            value={form.message}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-secondary resize-none"
                            rows={5}
                            required
                        />

                        <button
                            type="submit"
                            className="bg-secondary text-white font-semibold px-6 py-2 rounded-full hover:opacity-90 transition block w-full md:w-auto md:mx-0"
                        >
                            {t("submitButton")}
                        </button>
                    </form>
                </div>
            </Container>
        </section>
    );
}