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
      loading: false,
    };
  }
  getMakanans = () => {
    this.setState({
      loading: true,
    });
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoryYangDipilih)
      .then((res) => {
        this.setState({
          makanans: res.data,
          loading: false,
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
      loading: true,
    });
    axios.get(API_URL + "products?category.nama=" + value).then((res) => {
      this.setState({
        makanans: res.data,
        loading: false,
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
            position: "center",
            icon: "success",
            title: "Produk berhasil dimasukan ke keranjang",
            showConfirmButton: false,
            timer: 1500,
          });
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
              position: "center",
              icon: "success",
              title: "Produk berhasil dimasukan ke keranjang",
              showConfirmButton: false,
              timer: 1500,
            });
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
    const { makanans, categoryYangDipilih, loading } = this.state;
    return (
      <div className="container lg:px-10 py-6 px-2">
        <Categories
          changeCategory={this.changeCategory}
          categoryYangDipilih={categoryYangDipilih}
        />
        {loading ? (
          <div className="h-[80vh] flex items-center text-center justify-center w-full">
            <div class="text-center">
              <div role="status">
                <svg
                  class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  ></path>
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="wraper px-4 py-6 flex flex-wrap w-full">
            {makanans.map((makanan) => {
              return (
                <div
                  className="card rounded-md bg-white shadow-lg  m-1 p-4 lg:w-[20%] lg:m-3 w-[46%]"
                  key={makanan.id}
                >
                  <img
                    src={`assets/images/${makanan.category.nama.toLowerCase()}/${
                      makanan.gambar
                    }`}
                    alt=""
                    className="w-full h-[100px] rounded-md"
                  />
                  <div className="card-body m-2">
                    <h3 className="text-green-500 font-bold text-lg ">
                      {makanan.nama}
                    </h3>
                    <p className="text-sm pt-2">
                      Rp. {numberWithCommas(makanan.harga)}
                    </p>
                  </div>
                  <button
                    className="bg-green-500 shadow-md flex justify-center items-center shadow-green-400 w-full h-[40px] px-4 text-white rounded-md mt-4"
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
                  {/*<button
                  className="shadow-md shadow-gray-300  h-[40px] mx-1 px-4 text-center  text-white rounded-md mt-3"
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
                </button>*/}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
