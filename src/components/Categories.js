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
            <div className="container flex flex-wrap text-center lg:px-20 px-4">
                {this.state.categories.map((category) => {
                    return(
                        <p className="lg:px-6 text-sm  py-3 bg-gray-500 w-[27%] text-white rounded-md m-2" onClick={() => this.props.changeCategory(category.nama)}>{category.nama}</p>
                    )
                })}
            </div>
        )
    }
}