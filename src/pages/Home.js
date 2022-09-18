import axios from "axios";
import React, { Component } from "react";
import Categories from "../components/Categories";
import { API_URL } from "../utils";
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state= {
            makanans:[],
            categoryYangDipilih: 'Makanan',
            keranjangs: []
        }
    }
    getMakanans = () => {
        axios.get(API_URL + 'products?category.nama='+ this.state.categoryYangDipilih).then((res) => {
            this.setState({
                makanans: res.data
            })
        })
    }
    componentDidMount() {
        this.getMakanans()
        this.getKeranjangs()
    }
    changeCategory = (value) => {
        this.setState({
            makanans: [],
            categoryYangDipilih: value
        })
        axios.get(API_URL + 'products?category.nama='+ value).then((res) => {
            this.setState({
                makanans: res.data
            })
        })
    }
    masukKeranjang = (value) => {
        axios.get(API_URL + 'keranjangs?product.id='+value.id).then((res) => {
            if (res.data.length === 0) {
                const keranjang = {
                    jumlah:1,
                    total_harga: value.harga,
                    product: value
                }
                axios.post(API_URL + 'keranjangs', keranjang).then((res) => {
                    alert(value.nama + ' berhasil dimasukan ke keranjang');
                    this.getKeranjangs()
                })
            } else {
                const keranjang = {
                    jumlah: res.data[0].jumlah + 1,
                    total_harga: res.data[0].total_harga + value.harga,
                    product: value
                }
                axios.put(API_URL+'keranjangs/'+res.data[0].id, keranjang).then((res) => {
                    alert(value.nama + ' berhasil masuk keranjang');
                    this.getKeranjangs();
                })
            }
        })
    }
    getKeranjangs = () => {
        axios.get(API_URL + 'keranjangs').then((res) => {
            this.setState({
                keranjangs: res.data
            })
        })
    }
  render() {
      const {makanans} = this.state
    return (
      <div className="container lg:px-10 py-6 px-2">
          <Categories changeCategory={this.changeCategory}/>
        <div className="wraper px-4 py-6 flex flex-wrap w-full">
            {
                makanans.map((makanan) => {
                    return(
                        <div className="card bg-slate-200 m-1 p-4 lg:w-[26%] lg:m-3 w-[46%]">
                            <img src="" alt="" className="w-full h-[100px] bg-slate-300" />
                            <div className="card-body">
                                <h3>{makanan.nama}</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h6>Rp.{makanan.harga}</h6>
                            </div>
                            <button className="bg-slate-500 px-4 text-xs w-[100%] lg:w-[80%] py-2 text-white rounded-md mt-4" onClick={() => this.masukKeranjang(makanan)}>Masukan Keranjang</button>
                        </div>
                    )
                })
            }
            </div>
      </div>
    );
  }
}
