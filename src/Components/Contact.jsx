import React from "react";
import Topbar from "../Partials/Topbar";

const ContactShikhar = () => {
  document.title = "Contact Me";
  return (
    <>
    <Topbar />
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-5">
      <div className="max-w-4xl w-full bg-gray-800 text-white shadow-2xl rounded-lg overflow-hidden transform transition-transform hover:scale-105 duration-500">
        <div className="p-10">
          <h2 className="text-4xl font-extrabold text-blue-400 mb-5 text-center">
            Get in Touch with Shikhar
          </h2>
          <p className="text-lg mb-8 text-gray-300 text-center">
            I'd love to connect with you! Feel free to reach out using the
            details below.
          </p>
          <div className="space-y-6">
            <p className="flex items-center">
              <i className="ri-mail-line text-2xl text-blue-500 mr-3"></i>
              <span className="text-gray-300 font-medium">Email:</span>{" "}
              <a
                href="mailto:shikharvrm123@gmail.com"
                className="ml-2 underline text-blue-400 hover:text-blue-500 font-semibold"
              >
                shikahrvrm123@gmail.com{" "}
              </a>
            </p>
            <p className="flex items-center">
              <i className="ri-linkedin-box-line text-2xl text-blue-500 mr-3"></i>
              <span className="text-gray-300 font-medium">LinkedIn:</span>{" "}
              <a
                href="https://www.linkedin.com/in/shikhar-verma-7b6a34304/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 underline text-blue-400 hover:text-blue-500 font-semibold"
              >
                linkedin.com/in/shikhar-verma
              </a>
            </p>
            <p className="flex items-center">
              <i className="ri-github-line text-2xl text-blue-500 mr-3"></i>
              <span className="text-gray-300 font-medium">GitHub:</span>{" "}
              <a
                href="https://github.com/shikhu5804"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 underline text-blue-400 hover:text-blue-500 font-semibold"
              >
                github.com/shikhu5804
              </a>
            </p>
          </div>
        </div>
        <div className="bg-gray-900 py-4 text-center text-gray-500">
          <p className="font-semibold text-sm">
            © {new Date().getFullYear()} Shikhar Verma. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactShikhar;
