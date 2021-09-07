import React from "react";
import envVars from "@/injectWindowEnv";
import Link from "next/link";
import { useRouter } from "next/router";

type TopNavProps = {
  location: any;
};

const TopNav: React.FC<TopNavProps> = () => {
  const router = useRouter();

  const sectionsData = [
    {
      key: "graphiql",
      link: "/api/api-explorer",
      dataTestVal: "graphiql-explorer-link",
      title: "GraphiQL",
    },
    {
      key: "rest",
      link: "/api/rest",
      dataTestVal: "rest-explorer-link",
      title: "REST",
    },
  ];

  // eslint-disable-next-line no-underscore-dangle
  // envVars.consoleId || ?
  if (envVars.projectID) {
    sectionsData.push({
      key: "security",
      link: "/api/security/api_limits",
      dataTestVal: "security-explorer-link",
      title: "Security",
    });
  }

  const isActive = (link: string) => {
    if (router.pathname === "" || router.pathname === "/") {
      return link.includes("api-explorer");
    }
    return router.pathname.includes(link);
  };

  return (
    <div className="flex justify-between items-center border-b border-gray-300 bg-white px-sm">
      <div className="flex space-x-4 px-1">
        {sectionsData.map((section) => (
          <div
            role="presentation"
            className={`whitespace-nowrap font-medium pt-2 pb-1 px-2 border-b-4
        ${
          isActive(section.link)
            ? "border-gray-300 hover:border-gray-300"
            : "border-white hover:border-gray-100"
        }`}
            key={section.key}
          >
            <Link href={section.link} data-test={section.dataTestVal} passHref>
              <a className="text-gray-600 font-semibold no-underline hover:text-gray-600 hover:no-underline focus:text-gray-600 focus:no-underline">
                {section.title}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopNav;
