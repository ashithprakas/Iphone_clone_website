import { footerLinks } from "../utils/Constants";

const Footer = () => {
  return (
    <footer className="py-5 sm:px-10 px-5 ">
      <div className="screen-max-width">
        <div>
          <p className="font-semibold text-gray text-xs">
            More ways to shop:{" "}
            <span className="underline text-blue">
              {"Find and Apple Store"}
            </span>{" "}
            or <span className="underline text-blue">other retailer</span>
            {" near you"}
          </p>
          <p className="font-semibold text-gray text-xs">
            or call 0000123-060-1955
          </p>
        </div>

        <div className="bg-neutral-700 my-5 h-[1px] w-full"></div>
        <div className="flex md:flex-row flex-col md:items-center justify-between">
          <p className="font-semibold text-gray text-xs">
            Copyright @ 2024 Apple Inc. All rights Reserved.
          </p>
          <div className="flex">
            {footerLinks.map((link, index) => (
              <p key={link} className="font-semibold text-gray text-xs">
                {link}{" "}
                {index !== footerLinks.length - 1 && (
                  <span className="mx-1 sm:mx-2"> | </span>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
