import React, {useCallback, useState} from 'react';
import {useHttp} from "../myHooks/http.hook";

export const NewRent = ({ getAvailableBikesList }) => {

    const [typeOfBike, setTypeOfBike] = useState(
        ["Road", "Mountain", "Touring", "Folding", "Fixed Gear/Track", "BMX", "Recumbent", "Cruiser"]
    );

    const [form, setForm] = useState({
        name: '', type: '', rentPrice: ''
    });

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    };

    const { request } = useHttp();

    const addBikeHandler = async () => {
        try {
            const bike = await request('/api/bike/available/add', 'POST', {...form});
            getAvailableBikesList();
            console.log(bike);
        } catch (e) {}
    };


    return (
        <div>
            <label>
                Bike name
                <input type="text" name="name" onChange={changeHandler}/>
            </label>
            <label>
                Bike type
                <select name="type" onChange={changeHandler}>
                    {typeOfBike.map(bikeType => {
                        return <option>{ bikeType }</option>;
                    })}
                </select>
            </label>
            <label>
                Rent price
                <input type="text" name="rentPrice" onChange={changeHandler}/>
            </label>
            <button onClick={addBikeHandler}>Submit rent</button>
        </div>
    );
};