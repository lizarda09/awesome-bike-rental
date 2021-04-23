import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from "../myHooks/http.hook";

export const AvailableBikes = ({ availableList, getAvailableBikesList, getRentedBikesList }) => {

    const { request } = useHttp();
    const deleteBike = async event => {
        try {
            const idBike = event.target.dataset.id;
            const bike = await request(`/api/bike/available/${idBike}`, 'DELETE', null);
            getAvailableBikesList();
            console.log(bike);
        } catch (e){
            console.log(e);
        }
    };

    const rentBike = async event => {
        try {
            const idAvailableBike = event.target.dataset.id;
            const bikeInfo = await request(`api/bike/available/${idAvailableBike}`);
            const { id, name, type, rentPrice } = bikeInfo.bike;
            const deletedBike = await request(`/api/bike/available/${idAvailableBike}`, 'DELETE', null);
            const rentedBike = await request('api/bike/rented/add', 'POST', { name, type, rentPrice });
            getAvailableBikesList();
            getRentedBikesList();
            console.log(rentedBike);
        } catch (e){
            console.log(e);
        }
    };

    return (
        <>
            <h4>Available bicycles</h4>
            {availableList.map(bike => {
                return <div className="border border-secondary rounded bg-light p-4 m-3 d-flex">
                    <span className="mr-auto p-2">{bike.name} / {bike.type} / ${bike.rentPrice}</span>
                    <button data-id={bike._id} className="btn btn-info p-2 mr-2" onClick={rentBike}>Rent</button>
                    <button data-id={bike._id} className="btn btn-danger p-2" onClick={deleteBike}>Delete</button>
                </div>
            })}
        </>
    )

  }





