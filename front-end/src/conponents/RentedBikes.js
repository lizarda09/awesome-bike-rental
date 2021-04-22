import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from "../myHooks/http.hook";

export const RentedBikes = ({ rentedBikesList, getAvailableBikesList, getRentedBikesList }) => {

    const { request } = useHttp();

    const cancelRent = async event => {
        try {
            const idRentedBike = event.target.dataset.id;
            const bikeInfo = await request(`api/bike/rented/${idRentedBike}`);
            const { id, name, type, rentPrice } = bikeInfo.bike;
            const deletedBike = await request(`/api/bike/rented/${idRentedBike}`, 'DELETE', null);
            const availableBike = await request('api/bike/available/add', 'POST', { name, type, rentPrice });
            getAvailableBikesList();
            getRentedBikesList();
        } catch (e){
            console.log(e);
        }
    };

    return (
        <>
            <h2>You rent</h2>
            {rentedBikesList.map(bike => {
                return <div className="m-2">
                    {bike.name} / {bike.type} / {bike.rentPrice}
                    <button data-id={bike._id} className="btn-danger ml-2" onClick={cancelRent}>Cancel rent</button>
                </div>
            })}
        </>
    )

}


