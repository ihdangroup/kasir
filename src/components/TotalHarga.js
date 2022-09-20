
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { numberWithCommas } from "../utils/utils";

export default class TotalHarga extends Component {
  handleBayar = (totalBayar) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Terima kasih sudah berbelanja di toko kami",
        showConfirmButton: false,
        timer: 1500,
      });
  }
  render() {
    const totalHarga = this.props.keranjangs.reduce((result, item) => {
      return result + item.total_harga;
    }, 0);
    return (
      <div className="w-full flex flex-wrap bottom-0 text-white bg-slate-600 right-0 fixed p-6">
        <div className="p-2 w-full font-semibold flex flex-wrap justify-between">
          <h4>Total Harga:</h4>
          <h6>Rp.{numberWithCommas(totalHarga)}</h6>
        </div>
        <Link to="/sukses" className="my-2 bg-green-500 text-white py-2 w-full text-center rounded-md">
          <button
            onClick={() => this.handleBayar()}
          >
            Bayar Sekarang
          </button>
        </Link>
      </div>
    );
  }
}
