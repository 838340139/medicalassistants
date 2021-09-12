import React, { Component } from 'react'
import logo from "@/assets/healthPortrait.png";
export default class HealthPortriat extends Component {
    render() {
        return (
            <div className="pageHeader">
                        <img src={logo} alt="logo" />
            </div>
            // <div>
            //     <img src='../../assets/healthPortrait.png'/>
            // </div>
        )
    }
}
