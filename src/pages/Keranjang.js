import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../utils";

export default class Keranjang extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keranjangs: [],
    };
  }
  deleteKeranjang = (id) => {
    axios.delete(API_URL + "keranjangs/" + id).then((res) => {
      alert("produk berhasil dihapus dari keranjang");
      this.getListKeranjang();
    });
  };
  componentDidMount() {
    this.getListKeranjang();
  }
  getListKeranjang = () => {
    axios.get(API_URL + "keranjangs").then((res) => {
      this.setState({
        keranjangs: res.data,
      });
    });
  };
  render() {
    const { keranjangs } = this.state;
    return (
      <div>
        <div className="flex flex-wrap w-full py-4 lg:px-16 lg:py-10">
          <div className="mx-6 my-4">
              <Link to='/'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            </Link>
          </div>
          {keranjangs.length === 0
            ? "nggk ada barang"
            : keranjangs.map((barang) => {
                return (
                  <div className=" py-3 w-full lg:w-[24%] bg-slate-100 flex flex-wrap px-4 my-2">
                    <img
                      src=""
                      className="w-[30%] h-[100px] bg-gray-100"
                      alt=""
                    />
                    <div className="ml-4 text-whitew-[30%] ">
                      <h1 className="text-md font-bold">
                        {barang.product.nama}
                      </h1>
                      <div className="flex flex-wrap items-center">
                        <button className="m-2 bg-slate-400 text-white font-bold p-3 text-xs">
                          -
                        </button>
                        <h3>{barang.jumlah}</h3>
                        <button className="m-2 bg-slate-400 font-bold text-white p-3 text-xs">
                          +
                        </button>
                      </div>
                      <h4>Rp.{barang.total_harga}</h4>
                    </div>
                    <button
                      className="bg-slate-400 w-full rounded-md text-sm my-2 text-white text-center font-sm px-6 py-4"
                      onClick={() => this.deleteKeranjang(barang.id)}
                    >
                      Hapus Pesanan
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
    );
  }
}
