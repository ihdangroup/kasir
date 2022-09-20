import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "../utils";
import { numberWithCommas } from "../utils/utils";

export default class Keranjang extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keranjangs: [],
    };
  }
  deleteKeranjang = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-green",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios.delete(API_URL + "keranjangs/" + id).then((res) => {
            this.getListKeranjang();
          });
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };
  getListKeranjang = () => {
    axios.get(API_URL + "keranjangs").then((res) => {
      this.setState({
        keranjangs: res.data,
      });
    });
  };
  tambah = (keranjang) => {
    const keranjangBaru = {
      jumlah: keranjang.jumlah + 1,
      total_harga: keranjang.total_harga + keranjang.product.harga,
      product: keranjang.product,
    };
    axios
      .put(API_URL + "keranjangs/" + keranjang.id, keranjangBaru)
      .then((res) => {
        this.getListKeranjang();
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  kurang = (keranjang) => {
    if (keranjang.jumlah > 1) {
      const keranjangBaru = {
        jumlah: keranjang.jumlah - 1,
        total_harga: keranjang.total_harga - keranjang.product.harga,
        product: keranjang.product,
      };
      axios
        .put(API_URL + "keranjangs/" + keranjang.id, keranjangBaru)
        .then((res) => {
          this.getListKeranjang();
        });
    }
  };
  componentDidMount() {
    this.getListKeranjang();
  }
  render() {
    const { keranjangs } = this.state;
    return (
      <div className="mt-16">
        <div className="flex flex-wrap w-full py-4 lg:px-16 lg:py-10">
          {keranjangs.length === 0
            ? "nggk ada barang"
            : keranjangs.map((barang) => {
                return (
                  <div className=" py-3 w-full lg:w-[24%] bg-white border-b-2 border-green-300 flex flex-wrap px-4 my-2">
                    <img
                      src={`assets/images/${barang.product.category.nama}/${barang.product.gambar}`}
                      className="w-[30%] h-[100px]"
                      alt=""
                    />
                    <div className="ml-4 text-whitew-[30%] ">
                      <h1 className="text-green-500 font-bold text-lg">
                        {barang.product.nama}
                      </h1>
                      <div className="flex flex-wrap items-center">
                        <button
                          className="bg-white shadow-sm shadow-gray-300  h-[30px] mx-1   px-4 text-center text-green-500 rounded-md mt-3 text-xl"
                          onClick={() => this.kurang(barang)}
                        >
                          -
                        </button>
                        <h3 className="text-sm pt-2">{barang.jumlah}</h3>
                        <button
                          className="bg-white shadow-sm shadow-gray-300  h-[30px] mx-1   px-4 text-center text-green-500 rounded-md mt-3 text-xl"
                          onClick={() => this.tambah(barang)}
                        >
                          +
                        </button>
                      </div>
                      <h4 className="text-sm pt-2 font-bold">
                        Rp.{numberWithCommas(barang.total_harga)}
                      </h4>
                      <button
                        className="bg-pink-600 shadow-md h-[40px] mx-1   px-4 text-center  lg:w-[80%] text-white rounded-md mt-3"
                        onClick={() => this.deleteKeranjang(barang.id)}
                      >
                        Hapus Pesanan
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    );
  }
}
