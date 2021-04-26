import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from "../myHooks/http.hook";

export const RentedBikes = ({ rentedBikesList, getAvailableBikesList, getRentedBikesList }) => {

    const { request } = useHttp();

    const cancelRent = async event => {
        try {
            const idRentedBike = event.target.dataset.id;
            const bikeInfo = await request(`api/bike/rented/${idRentedBike}`);
            const { name, type, rentPrice, dateOfRent } = bikeInfo.bike;
            await request(`/api/bike/rented/${idRentedBike}`, 'DELETE', null);
            const today = new Date();
            const rentDay = new Date(dateOfRent);
            const diff = (today - rentDay)/ (1000*60*60);
            if (diff >= 20){
                const newRentPrice = rentPrice/2;
                await request('api/bike/available/add', 'POST', { name, type, rentPrice: newRentPrice });
            } else {
                await request('api/bike/available/add', 'POST', { name, type, rentPrice });
            }
            getAvailableBikesList();
            getRentedBikesList();
        } catch (e){
            console.log(e);
        }
    };

    return (
        <>
            <h4>You rent</h4>
            {rentedBikesList.map(bike => {
                return <div className="border border-secondary rounded bg-light p-4 m-3 d-flex">
                    <span className="mr-auto p-2">{bike.name} / {bike.type} / ${bike.rentPrice}</span>
                    <button data-id={bike._id} className="btn btn-danger p-2" onClick={cancelRent}>Cancel rent</button>
                </div>
            })}
        </>
    )

}


