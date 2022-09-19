import axios from 'axios'
import React, { Component } from 'react'
import { API_URL } from '../utils'

export default class Categories extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             categories: []
        }
    }
    getCategories = () => {
        axios.get(API_URL + 'categories').then((res) => {
            this.setState({
                categories: res.data
            })
        }).catch((e) => {
            console.log(e.message)
        })
    }
    componentDidMount() {
        this.getCategories()
    }
    render() {
        return (
            <div  className="container flex flex-wrap mt-16 text-center lg:px-20 px-4">
                {this.state.categories.map((category) => {
                    return(
                            <p className={ this.props.categoryYangDipilih === category.nama && "bg-green-500 text-white"} style={{ padding: "12px 0px", fontWeight:"bold", fontSize:"14px", borderRadius: "6px", lineHeight: '20px', margin: '0.5rem', width: "27%", boxShadow: "3px 3px 6px rgba(34,197,94,0.2)"}} onClick={() => this.props.changeCategory(category.nama)}>{category.nama}</p>
                    )
                })}
            </div>
        )
    }
}
