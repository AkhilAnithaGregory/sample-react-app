import React from 'react';
import './Address.scss'
import { UIStore } from './../store';
import { getAddress } from 'endpoints';
import map from 'images/map.png';


export const AddressComponent = () => {
    const address = UIStore.useState(s => s.contactAddress);
    console.log('address', address);
    getAddress();
    return (
        <div>
            <div className='form-container'>
                <header className='address-header'>Contact Information</header>
                <hr />
                <img className='image-align' src={map} alt='image' />
                <div className='address-content '>
                    <div className='mb-2'>
                    <span style={{color:'orange'}}>Address</span>
                    <br></br>
                    <span>UK</span>
                    <br></br>
                    <span>{address.uk_address}</span>
                    <br></br>
                    <span>India</span>
                    <br></br>
                    <span>{address.india_address}</span>
                    <br></br>
                    </div>
                    <div className='row-direction'>
                    <span style={{color:'orange'}}>Number</span>
                    <br></br>
                    <span>{address.contact_number}</span>
                    <p style={{color:'orange'}}>Email</p>
                    <span>{address.email_address}</span>
                    </div>
                </div>
            </div>
        </div>)
}