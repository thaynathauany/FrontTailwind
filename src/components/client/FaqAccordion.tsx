// src/components/client/FaqAccordion.tsx
"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import Container from "@/components/ui/Container";

type FAQ = { question: string; answer: string };

export default function FaqAccordion({
    faqs,
    heading,
    ctaLabel,
}: {
    faqs: FAQ[];
    heading: string;
    ctaLabel: string;
}) {
    return (
        <section className="mt-20">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-6">
                    <div className="w-full flex flex-col gap-4 max-w-[500px] p-4">
                        <p className="text-3xl font-bold">{heading}</p>
                        <p className="text-base mt-4 text-primary">
                            {/* coloque a descrição traduzida se houver */}
                        </p>
                        <button className="mt-4 inline-block self-start bg-secondary text-white px-4 py-2 rounded-full">
                            {ctaLabel}
                        </button>
                    </div>

                    <div className="w-full p-4">
                        <dl className="divide-y divide-[#C1C1C1]">
                            {faqs.map((faq, i) => (
                                <Disclosure key={i} as="div" className="py-6 first:pt-0 last:pb-0">
                                    <dt>
                                        <DisclosureButton className="group flex w-full items-start justify-between text-left text-primary">
                                            <span className="text-xl font-semibold text-black">
                                                {faq.question}
                                            </span>
                                            <span className="ml-6 flex h-7 items-center">
                                                <PlusSmallIcon aria-hidden="true" className="size-6 group-data-open:hidden" />
                                                <MinusSmallIcon aria-hidden="true" className="size-6 group-not-data-open:hidden" />
                                            </span>
                                        </DisclosureButton>
                                    </dt>
                                    <DisclosurePanel as="dd" className="mt-2 pr-12">
                                        <p className="text-base text-primary">{faq.answer}</p>
                                    </DisclosurePanel>
                                </Disclosure>
                            ))}
                        </dl>
                    </div>
                </div>
            </Container>
        </section>
    );
}