import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavbarComp() {
  const [scale, setScale] = useState(false);
  return (
    <div className="navbar top-0 left-0 fixed w-full">
      <div className="flex flex-wrap px-10 lg:px-16 text-white py-6 bg-green-500 items-center">
        <div className="flex justify-between w-[100%] lg:w-[50%]">
          <h1 className="text-xl font-bold">Kasir</h1>
          <div className="flex items-center">
            <Link to="/keranjang" className="mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-cart3"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </Link>
            <div
              className="lg:hidden flex flex-wrap ml-2 w-[20px] h-[20px] items-center justify-between"
              onClick={() => (scale ? setScale(false) : setScale(true))}
            >
              <span className="w-full h-[2px] bg-white"></span>
              <span className="w-full h-[2px] bg-white"></span>
              <span className="w-full h-[2px] bg-white"></span>
            </div>
          </div>
        </div>
        <div
          className={
            scale
              ? "flex w-full lg:w-[40%] lg:mt-0"
              : "hidden lg:flex lg:w-[40%]"
          }
        >
          <ul className="lg:flex flex justify-around mt-10 lg:mt-0 flex-wrap lg:w-[100%] items-center w-full">
            <li className="w-full py-2 lg:py-0 lg:w-0">Home</li>
            <li className="w-full py-2 lg:py-0 lg:w-0">Product</li>
            <li className="w-full py-2 lg:py-0 lg:w-0">About</li>
            <li className="w-full py-2 lg:py-0 lg:w-0">Contact</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
