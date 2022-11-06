import React from "react";

const Skeleton = () => {
  return (
    <>
      <div className="card rounded bg-slate-100 m-1 p-4 lg:w-[20%] lg:m-3 w-[46%]">
        <div className="w-full h-[100px] rounded-md bg-slate-400 mb-4"></div>
        <div className="h-5 w-2/3 bg-slate-400 rounded mb-2"></div>
        <div className="h-2 w-1/3 bg-slate-400 rounded mb-2"></div>
        <div className="h-7 w-full bg-slate-400 rounded"></div>
      </div>
    </>
  );
};
const SkeletonFirst = () => {
    return (
        <>
            <p className="px-[12px] h-7 bg-slate-400 font-bold rounded m-2 w-[27%]"/>
        </>
    )
}
export {Skeleton, SkeletonFirst};
