import axios from "axios";
import React, { Component } from "react";
import Swal from "sweetalert2";
import Categories from "../components/Categories";
import { API_URL } from "../utils";
import { numberWithCommas } from "../utils/utils";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      makanans: [],
      categoryYangDipilih: "Makanan",
      keranjangs: [],
    };
  }
  getMakanans = () => {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoryYangDipilih)
      .then((res) => {
        this.setState({
          makanans: res.data,
        });
      });
  };
  componentDidMount() {
    this.getMakanans();
    this.getKeranjangs();
  }
  changeCategory = (value) => {
    this.setState({
      makanans: [],
      categoryYangDipilih: value,
    });
    axios.get(API_URL + "products?category.nama=" + value).then((res) => {
      this.setState({
        makanans: res.data,
      });
    });
  };
  masukKeranjang = (value) => {
    axios.get(API_URL + "keranjangs?product.id=" + value.id).then((res) => {
      if (res.data.length === 0) {
        const keranjang = {
          jumlah: 1,
          total_harga: value.harga,
          product: value,
        };
        axios.post(API_URL + "keranjangs", keranjang).then((res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Produk berhasil dimasukan ke keranjang',
            showConfirmButton: false,
            timer: 1500
          })
          this.getKeranjangs();
        });
      } else {
        const keranjang = {
          jumlah: res.data[0].jumlah + 1,
          total_harga: res.data[0].total_harga + value.harga,
          product: value,
        };
        axios
          .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
          .then((res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Produk berhasil dimasukan ke keranjang',
              showConfirmButton: false,
              timer: 1500
            })
            this.getKeranjangs();
          });
      }
    });
  };
  getKeranjangs = () => {
    axios.get(API_URL + "keranjangs").then((res) => {
      this.setState({
        keranjangs: res.data,
      });
    });
  };
  render() {
    const { makanans, categoryYangDipilih } = this.state;
    return (
      <div className="container lg:px-10 py-6 px-2">
        <Categories changeCategory={this.changeCategory} categoryYangDipilih={categoryYangDipilih} />
        <div className="wraper px-4 py-6 flex flex-wrap w-full">
          {makanans.map((makanan) => {
            return (
              <div className="card rounded-md bg-white shadow-lg  m-1 p-4 lg:w-[26%] lg:m-3 w-[46%]">
                <img src={`assets/images/${makanan.category.nama.toLowerCase()}/${makanan.gambar}`} alt="" className="w-full h-[100px]" />
                <div className="card-body m-2">
                  <h3 className="text-green-500 font-bold text-lg ">
                    {makanan.nama}
                  </h3>
                  <p className="text-sm pt-2">Rp. {numberWithCommas(makanan.harga)}</p>
                </div>
                <button
                  className="bg-green-500 shadow-md shadow-green-400 h-[40px] px-4 text-white rounded-md mt-4"
                  onClick={() => this.masukKeranjang(makanan)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    fill="currentColor"
                    className="bi bi-cart3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                </button>
                <button
                  className="bg-white shadow-md shadow-gray-300  h-[40px] mx-1 px-4 text-center  text-white rounded-md mt-3"
                  onClick={() => this.masukKeranjang(makanan)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    fill="pink"
                    class="bi bi-bag-heart"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5Zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0ZM14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
