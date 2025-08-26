"use client";

import { useRef, useState, ChangeEvent } from "react";
import CustomButton from "@/components/ui/CustomButton";
import { useTranslations } from "next-intl";
import TopNotice from "@/components/ui/TopNotice";

function UploadCard({
    inputRef,
    onPick,
    onChange,
    fileName,
    buttonLabel,
    helper,
}: {
    inputRef: React.RefObject<HTMLInputElement>;
    onPick: () => void;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    fileName?: string;
    buttonLabel?: string;
    helper?: string;
}) {
    const t = useTranslations("MyPanel.personalData");
    const btnText = buttonLabel ?? t("sendFile");
    const helperText = helper ?? t("uploadFormats");

    return (
        <div className="mt-3 rounded-xl border border-gray-300/70 p-4 max-w-sm" >
            <div className="flex items-start gap-3">
                <div className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-md">
                    <img src="/images/icones/upload.png" alt="" className="h-5 w-5" />
                </div>

                <div className="flex-1">
                    <button
                        type="button"
                        onClick={onPick}
                        className="text-secondary underline underline-offset-2 cursor-pointer"
                    >
                        {btnText}
                    </button>

                    <p className="mt-1 text-xs text-primary leading-relaxed">{helperText}</p>

                    {fileName && (
                        <p className="mt-2 text-xs text-primary">
                            {t("selectedFile")} <span className="font-medium">{fileName}</span>
                        </p>
                    )}

                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*,.pdf,.heic,.heif,.xls,.xlsx,.csv,.doc,.docx"
                        className="hidden"
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default function PersonalData() {
    const t = useTranslations("MyPanel.personalData");

    const idNewRef = useRef<HTMLInputElement>(null!);
    const addrNewRef = useRef<HTMLInputElement>(null!);
    const idLegacyRef = useRef<HTMLInputElement>(null!);
    const addrLegacyRef = useRef<HTMLInputElement>(null!);

    const [idNewName, setIdNewName] = useState("");
    const [addrNewName, setAddrNewName] = useState("");
    const [idLegacyName, setIdLegacyName] = useState("");
    const [addrLegacyName, setAddrLegacyName] = useState("");

    const pick = (ref: React.RefObject<HTMLInputElement>) => ref.current?.click();

    const onChange =
        (setName: (v: string) => void) =>
            (e: ChangeEvent<HTMLInputElement>) => {
                const f = e.target.files?.[0];
                if (f) setName(f.name);
            };

    return (
        <div className="w-full">
            <TopNotice />
            <div className="flex flex-col w-full max-w-sm sm:max-w-md px-4 sm:px-6 lg:px-0 mx-auto">

                <div className="flex-1 flex items-start sm:items-center justify-center mt-8">
                    <div className="flex flex-col items-start justify-start w-full">
                        <div className="w-full space-y-5">
                            <div className="flex flex-col space-y-2 text-left">
                                <h1 className="text-2xl font-semibold text-black">{t("title")}</h1>
                            </div>

                            {/* Formulário */}
                            <form className="space-y-4">
                                <input type="text" placeholder={t("name")} className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md" />
                                <input type="email" placeholder={t("email")} className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md" />
                                <input type="tel" placeholder={t("phone")} className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md" />
                                <CustomButton text={t("saveChanges")} disabled onClick={() => { }} />
                            </form>

                            {/* Nova UI */}
                            <section className="pt-6 w-full">
                                <h2 className="text-2xl font-semibold text-black">{t("documents")}</h2>

                                <div className="mt-3">
                                    <p className="text-primary">{t("identityDocument")}</p>
                                    <UploadCard
                                        inputRef={idNewRef}
                                        onPick={() => pick(idNewRef)}
                                        onChange={onChange(setIdNewName)}
                                        fileName={idNewName}
                                    />
                                </div>

                                <div className="mt-6">
                                    <p className="text-primary">{t("addressProof")}</p>
                                    <UploadCard
                                        inputRef={addrNewRef}
                                        onPick={() => pick(addrNewRef)}
                                        onChange={onChange(setAddrNewName)}
                                        fileName={addrNewName}
                                    />
                                </div>
                            </section>

                            {/* Antiga (provisória) */}
                            <section className="pt-6 w-full">
                                <h2 className="text-xl font-semibold text-black">{t("previewTitle")}</h2>

                                <div className="mt-4">
                                    <p className="text-primary">{t("identityDocument")}</p>
                                    <button type="button" onClick={() => pick(idLegacyRef)} className="text-secondary underline underline-offset-2 cursor-pointer">
                                        {t("updateDocument")}
                                    </button>
                                    {idLegacyName && (
                                        <p className="text-xs text-primary mt-1">
                                            {t("selectedFile")} <span className="font-medium">{idLegacyName}</span>
                                        </p>
                                    )}
                                    <input ref={idLegacyRef} type="file" accept="image/*,.pdf" className="hidden" onChange={onChange(setIdLegacyName)} />
                                </div>

                                <div className="mt-6">
                                    <p className="text-primary">{t("addressProof")}</p>
                                    <button type="button" onClick={() => pick(addrLegacyRef)} className="text-secondary underline underline-offset-2 cursor-pointer">
                                        {t("updateDocument")}
                                    </button>
                                    {addrLegacyName && (
                                        <p className="text-xs text-primary mt-1">
                                            {t("selectedFile")} <span className="font-medium">{addrLegacyName}</span>
                                        </p>
                                    )}
                                    <input ref={addrLegacyRef} type="file" accept="image/*,.pdf" className="hidden" onChange={onChange(setAddrLegacyName)} />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}