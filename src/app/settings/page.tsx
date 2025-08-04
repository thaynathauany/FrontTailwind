"use client";

import { useTranslations } from "next-intl";
import {
  BellIcon,
  CreditCardIcon,
  CubeIcon,
  FingerPrintIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export default function Configuration() {
  const t = useTranslations("Settings");

  const secondaryNavigation = [
    { name: t("general"), href: "#", icon: UserCircleIcon, current: true },
    { name: t("security"), href: "#", icon: FingerPrintIcon, current: false },
    { name: t("notifications"), href: "#", icon: BellIcon, current: false },
    { name: t("plan"), href: "#", icon: CubeIcon, current: false },
    { name: t("billing"), href: "#", icon: CreditCardIcon, current: false },
    { name: t("teamMembers"), href: "#", icon: UsersIcon, current: false },
  ];
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div className="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
        <h1 className="sr-only">General Settings</h1>

        <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
          <nav className="flex-none px-4 sm:px-6 lg:px-0">
            <ul
              role="list"
              className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col"
            >
              {secondaryNavigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-50 text-indigo-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                      "group flex gap-x-3 rounded-md py-2 pr-3 pl-2 text-sm/6 font-semibold"
                    )}
                  >
                    <item.icon
                      aria-hidden="true"
                      className={classNames(
                        item.current
                          ? "text-indigo-600"
                          : "text-gray-400 group-hover:text-indigo-600",
                        "size-6 shrink-0"
                      )}
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
          <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
            <div>
              <h2 className="text-base/7 font-semibold text-gray-900">
                Profile
              </h2>
              <p className="mt-1 text-sm/6 text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <dl className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
                <div className="py-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Full name
                  </dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">Tom Cook</div>
                    <button
                      type="button"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Update
                    </button>
                  </dd>
                </div>
                <div className="py-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Email address
                  </dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">tom.cook@example.com</div>
                    <button
                      type="button"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Update
                    </button>
                  </dd>
                </div>
                <div className="py-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Title
                  </dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">Human Resources Manager</div>
                    <button
                      type="button"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Update
                    </button>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-base/7 font-semibold text-gray-900">
                Bank accounts
              </h2>
              <p className="mt-1 text-sm/6 text-gray-500">
                Connect bank accounts to your account.
              </p>

              <ul
                role="list"
                className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6"
              >
                <li className="flex justify-between gap-x-6 py-6">
                  <div className="font-medium text-gray-900">
                    TD Canada Trust
                  </div>
                  <button
                    type="button"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Update
                  </button>
                </li>
                <li className="flex justify-between gap-x-6 py-6">
                  <div className="font-medium text-gray-900">
                    Royal Bank of Canada
                  </div>
                  <button
                    type="button"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Update
                  </button>
                </li>
              </ul>

              <div className="flex border-t border-gray-100 pt-6">
                <button
                  type="button"
                  className="text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  <span aria-hidden="true">+</span> Add another bank
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-base/7 font-semibold text-gray-900">
                Integrations
              </h2>
              <p className="mt-1 text-sm/6 text-gray-500">
                Connect applications to your account.
              </p>

              <ul
                role="list"
                className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6"
              >
                <li className="flex justify-between gap-x-6 py-6">
                  <div className="font-medium text-gray-900">QuickBooks</div>
                  <button
                    type="button"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Update
                  </button>
                </li>
              </ul>

              <div className="flex border-t border-gray-100 pt-6">
                <button
                  type="button"
                  className="text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  <span aria-hidden="true">+</span> Add another application
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-base/7 font-semibold text-gray-900">
                Language and dates
              </h2>
              <p className="mt-1 text-sm/6 text-gray-500">
                Choose what language and date format to use throughout your
                account.
              </p>

              <dl className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
                <div className="py-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Language
                  </dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">English</div>
                    <button
                      type="button"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Update
                    </button>
                  </dd>
                </div>
                <div className="py-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Date format
                  </dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">DD-MM-YYYY</div>
                    <button
                      type="button"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Update
                    </button>
                  </dd>
                </div>
                <div className="flex pt-6">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Automatic timezone
                  </dt>
                  <dd className="flex flex-auto items-center justify-end">
                    <div className="group relative inline-flex w-8 shrink-0 rounded-full bg-gray-200 p-px inset-ring inset-ring-gray-900/5 outline-offset-2 outline-indigo-600 transition-colors duration-200 ease-in-out has-checked:bg-indigo-600 has-focus-visible:outline-2 dark:bg-white/5 dark:inset-ring-white/10 dark:outline-indigo-500 dark:has-checked:bg-indigo-500">
                      <span className="size-4 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5" />
                      <input
                        defaultChecked
                        name="automatic-timezone"
                        type="checkbox"
                        aria-label="Automatic timezone"
                        className="absolute inset-0 appearance-none focus:outline-hidden"
                      />
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
