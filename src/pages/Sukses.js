import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../utils";

export default class Sukses extends Component {
  componentDidMount() {
    axios.get(API_URL + "keranjangs").then((res) => {
      const keranjangs = res.data;
      keranjangs.map((keranjang) => {
        return axios
          .delete(API_URL + "keranjangs/" + keranjang.id)
          .then((res) => {
            console.log("data di keranjang berhasil dihapus");
          });
      });
    });
  }
  render() {
    return (
      <div>
        <div className="mx-6 h-[10vh] flex items-end">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-arrow-bar-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z"
              />
            </svg>
          </Link>
          <h2 className=" w-[80%] text-center font-semibold text-lg">
            Halaman Keranjang
          </h2>
        </div>
        <div className="h-[65vh] flex items-center flex-col text-center w-full justify-center">
          <img
            src="assets/images/cart.svg"
            alt="cart"
            width="200px"
            height="200px"
          />
          <h3 className="mt-4 text-sm font-semibold px-6 flex flex-wrap justify-center">
            <span className="text-green-500 text-2xl w-full">
              Selamat menunggu😁
            </span>{" "}
            jangan terlalu berharap pesanan akan datang🤣
          </h3>
        </div>
      </div>
    );
  }
}
