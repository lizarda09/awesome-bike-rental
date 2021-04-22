import './App.css';
import {NewRent} from "./conponents/NewRent";
import {AvailableBikes} from "./conponents/AvailableBikes";
import {useHttp} from "./myHooks/http.hook";
import {useCallback, useEffect, useState} from "react";
import {RentedBikes} from "./conponents/RentedBikes";

function App() {
    const { request } = useHttp();
    const [availableBikesList, setAvailableBikesList] = useState([]);
    const getAvailableBikesList = useCallback(async () => {
        try {
            const data = await request('/api/bike/available', 'GET', null);
            console.log(data);
            setAvailableBikesList(data.bikes);
        } catch (e){
            console.log(e);
        }
    }, [request]);

    useEffect(() => {
        getAvailableBikesList()
    }, [getAvailableBikesList]);

    const [rentedBikesList, setRentedBikesList] = useState([]);
    const getRentedBikesList = useCallback(async () => {
        try {
            const data = await request('/api/bike/rented', 'GET', null);
            console.log(data);
            setRentedBikesList(data.bikes);
        } catch (e){
            console.log(e);
        }
    }, [request]);

    useEffect(() => {
        getRentedBikesList()
    }, [getRentedBikesList]);

  return (
      <div className="container">
        <h1>Awesome bike rental</h1>
        <NewRent getAvailableBikesList={getAvailableBikesList} />
        <RentedBikes
            rentedBikesList={rentedBikesList}
            getAvailableBikesList={getAvailableBikesList}
            getRentedBikesList={getRentedBikesList}/>
        <AvailableBikes
            availableList={availableBikesList}
            getAvailableBikesList={getAvailableBikesList}
            getRentedBikesList={getRentedBikesList}
        />
      </div>
  );
}

export default App;
