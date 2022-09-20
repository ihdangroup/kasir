import axios from 'axios'
import React, { Component } from 'react'
import { API_URL } from '../utils'

export default class Sukses extends Component {
    componentDidMount() {
        axios.get(API_URL+'keranjangs').then((res) => {
            const keranjangs = res.data;
            keranjangs.map((keranjang) => {
                return axios.delete(API_URL+'keranjangs/'+keranjang.id).then((res) => {
                    console.log('data di keranjang berhasil dihapus')
                })
            })
        })
    }
    render() {
        return (
            <div className="h-[65vh] flex items-center flex-col text-center w-full justify-center">
              <img src="assets/images/cart.svg" alt="cart" width="200px" height="200px" />
              <h3 className="mt-4 text-sm font-semibold px-6 flex flex-wrap justify-center"><span className="text-green-500 text-2xl w-full">Selamat menunggu😁</span> jangan terlalu berharap pesanan akan datang🤣</h3>
            </div>
        )
    }
}
