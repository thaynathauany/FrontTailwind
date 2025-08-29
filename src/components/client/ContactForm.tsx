"use client";

import { useState } from "react";
import { useTransition } from "react";
import { sendContact } from "../server/actions/contact";

type Props = {
    placeholders: { name: string; email: string; subject: string; message: string };
    submitLabel: string;
    successMsg: string;
    errorMsg: string;
};

export default function ContactForm({ placeholders, submitLabel, successMsg, errorMsg }: Props) {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
    const [pending, startTransition] = useTransition();
    const [hp, setHp] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (hp) return;

        startTransition(async () => {
            const ok = await sendContact(form);
            setStatus(ok ? "ok" : "error");
            if (ok) setForm({ name: "", email: "", subject: "", message: "" });
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="company"
                autoComplete="off"
                tabIndex={-1}
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                className="hidden"
            />

            <input
                type="text"
                name="name"
                placeholder={placeholders.name}
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-secondary"
                required
            />
            <input
                type="email"
                name="email"
                placeholder={placeholders.email}
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-secondary"
                required
            />
            <input
                type="text"
                name="subject"
                placeholder={placeholders.subject}
                value={form.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-secondary"
            />
            <textarea
                name="message"
                placeholder={placeholders.message}
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-secondary resize-none"
                rows={5}
                required
            />

            <button
                type="submit"
                disabled={pending}
                className="bg-secondary text-white font-semibold px-6 py-2 rounded-full hover:opacity-90 transition block w-full md:w-auto"
            >
                {pending ? "..." : submitLabel}
            </button>

            {status === "ok" && (
                <p className="text-green-600 text-sm mt-2">{successMsg}</p>
            )}
            {status === "error" && (
                <p className="text-red-600 text-sm mt-2">{errorMsg}</p>
            )}
        </form>
    );
}