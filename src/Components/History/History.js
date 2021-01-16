import axios from 'axios';
import { React, useState, useEffect } from 'react';
import './History.css'
import Navbar from '../Navbar/Navbar';

const History = ({ email }) => {

    const dbUrl = "http://localhost:3003";
    const [history, setHistory] = useState([]);

    useEffect(() => {
        axios.post(dbUrl + "/history", { email })
            .then(function (response) {
                setHistory(response.data)
            })
            .catch(function (error) {
                window.M.toast({ html: 'Issue while fetching History! \n Try again Later!' })
            })
    }, [])


    return (
        <>
            <Navbar />
            <h1 className="center">History</h1>
            <table className="centered responsive-table highlight">
                <thead>
                    <tr>
                        <th>Movie Name</th>
                        <th>No. Of Tickets</th>
                        <th>Date</th>
                        <th>Show</th>
                    </tr>
                </thead>

                <tbody>

                    {

                        history.map((elm) => {
                            return (
                                <tr>
                                    <td>{elm.movieName}</td>
                                    <td>{elm.noOfTickets}</td>
                                    <td>{elm.movieDate}</td>
                                    <td>{elm.movieShow}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </>
    )

}

export default History;