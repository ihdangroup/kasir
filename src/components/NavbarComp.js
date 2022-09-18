import React from "react";
import { useState } from "react";
import { Link }from "react-router-dom";

export default function NavbarComp() {
    const [scale, setScale] = useState(false);
  return (
    <div className="navbar">
      <div className="flex flex-wrap px-10 lg:px-16 py-6 bg-slate-400 items-center">
        <div className="flex justify-between w-[100%] lg:w-[50%]">
          <h1 className="text-xl font-bold">Kasir</h1>
          <div className="flex items-center">
              <Link to='/keranjang'>
                keranjang
              </Link>
            <div className="lg:hidden flex flex-wrap ml-2 w-[20px] h-[20px] items-center justify-between" onClick={() => scale? setScale(false): setScale(true)}>
              <span className="w-full h-[2px] bg-slate-900"></span>
              <span className="w-full h-[2px] bg-slate-900"></span>
              <span className="w-full h-[2px] bg-slate-900"></span>
            </div>
          </div>
        </div>
        <div className={scale? "flex w-full lg:w-[40%] lg:mt-0": "hidden lg:flex lg:w-[40%]"}>
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
