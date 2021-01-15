import axios from 'axios';
import { React, useState } from 'react';
import './Movies.css'
var Cookies = require('js-cookie');

const Movies = ({ movies }) => {

    const dbUrl = "http://localhost:3003";
    const [bookedTicketInfo, setBookedTicketInfo] = useState([]);
    

    //handle Book Now Form
    const handleBookNow = (e) => {
        e.preventDefault();

        console.log(Cookies.get('AuthToken'))
        if (Cookies.get('AuthToken') === undefined || null || "") {
            window.M.toast({ html: 'Please login to book ticket!' })
        }
        else {

            const data = {
                token: Cookies.get('AuthToken'),
                email: Cookies.get('Email'),
                movieName: e.target.booknow_movieName.value,
                noOfTickets: e.target.booknow_noOfTickets.value,
                movieDate: e.target.booknow_movieDate.value,
                movieShow: e.target.booknow_movieShow.value
            }


            axios.post(dbUrl + "/book", data)
                .then(function (response) {
                    console.log(response.data);

                    if (response.data.Code === 200) {
                        window.M.toast({ html: 'Movie tickets are booked!' }, 3000);
                        e.target.reset();
                        var elem = document.getElementById("bn" + data.movieName);
                        window.M.Modal.getInstance(elem).close();

                        setBookedTicketInfo(data);

                        elem = document.getElementById("bookingCompleted" + data.movieName);
                        window.M.Modal.getInstance(elem).open();

                    } else if (response.data.Code === 500) {
                        window.M.toast({ html: 'Error while booking Tickets! \n Please try again later!' });
                        e.target.reset();
                    }

                }).catch(function (error) {
                    console.log(error)
                    if (error.data.success === false) {
                        Cookies.remove('AuthToken');
                        Cookies.remove('Email');
                        Cookies.remove('Name');
                        window.M.toast({ html: 'Your session expired!' });
                        setTimeout(function () {
                            window.location.href = "http://localhost:3000";
                        }, 2000);
                    } else {
                        console.log(error);
                    }
                })

        }
    }

    return (
        movies.map((elm) => {
            // {console.log(elm)}
            return (
                <>
                    <div className="col s12 m6 l3">
                        <div className="card hoverable">
                            <div className="card-image waves-effect waves-block waves-light">
                                <img className="activator" src={elm.poster} />
                            </div>
                            <div className="card-content">
                                <span className="card-title activator grey-text text-darken-4">{elm.title}({elm.year})<i class="material-icons right">more_vert</i></span>
                                <p className="row">
                                    <div className="col s6 m6 l6">
                                        <a href={"#" + elm.title} className="modal-trigger">Trailer</a>
                                    </div>
                                    <div className="col s6 m6 l6">
                                        <a href={"#bn" + elm.title} class="modal-trigger waves-effect waves-light">Book Now</a>
                                    </div>
                                </p>
                            </div>
                            <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4 center">{elm.title}({elm.year})<i className="material-icons right">close</i></span>
                                <p>{elm.desc}</p>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Modal Structure for Trailer --> */}
                    <div id={elm.title} class="modal">
                        <div class="modal-content">
                            <h4 className="center">{elm.title} <i className="material-icons right modal-close">close</i></h4>
                            <hr />
                            <div class="video-container">
                                <iframe width="853" height="480" src={elm.trailer.replace("watch?v=", "embed/")} frameborder="0" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Modal Structure for Book Now --> */}
                    <div id={"bn" + elm.title} class="modal booknow">
                        <form onSubmit={handleBookNow}>
                            <div class="modal-content">
                                <h4 className="center">Book Now <i className="material-icons right modal-close">close</i></h4>
                                <hr />
                                <p>
                                    <div class="row">
                                        <div class="col s4 right-align">
                                            <h5>Movie Name :</h5>
                                        </div>
                                        <div class="col s5 push-s1">
                                            <h5 id="movieName">{elm.title}</h5>
                                            <input type="hidden" name="booknow_movieName" value={elm.title} />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col s4 right-align">
                                            <h5>No. of Tickets :</h5>
                                        </div>
                                        <div class="input-field col s3 push-s2">
                                            <select name="booknow_noOfTickets" required>
                                                <option value="1" selected>1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                            <label>No. of Tickets</label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col s4 right-align">
                                            <h5>Movie Date :</h5>
                                        </div>
                                        <div class="col s3 push-s2">
                                            <input type="text" name="booknow_movieDate" class="datepicker validate" required />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col s4 right-align">
                                            <h5>Movie Show :</h5>
                                        </div>
                                        <div class="input-field col s3 push-s2">
                                            <select name="booknow_movieShow" required>
                                                <option value="Morning" selected>Morning</option>
                                                <option value="Afternoon">Afternoon</option>
                                                <option value="Evening">Evening</option>
                                                <option value="Late Night">Late Night</option>
                                            </select>
                                            <label>Movie Show</label>
                                        </div>
                                    </div>
                                </p>
                            </div>
                            <div className="modal-footer center">
                                <div className="row">
                                    <div className="col s3 push-s3 center">
                                        <button className="btn waves-effect waves-light" type="submit" name="action">Book Now</button>
                                    </div>
                                    <div className="col s3 push-s3 center">
                                        <button className="btn waves-effect waves-light" type="reset" name="action">Reset</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>


                    {/* <!-- Modal Structure for Booking Completed Info --> */}
                    <div id={"bookingCompleted"+elm.title} class="modal bookingCompleted modal-fixed-footer">
                        <div class="modal-content">
                            <h4>Booking Info</h4>
                            <hr/>
                            <p>
                            <div class="row">
                                        <div class="col s4 right-align">
                                            <h5>Movie Name :</h5>
                                        </div>
                                        <div class="col s5 push-s1">
                                            <h5 id="movieName">{elm.title}</h5>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col s4 right-align">
                                            <h5>No. of Tickets :</h5>
                                        </div>
                                        <div class="input-field col s3 push-s2">
                                        <h5>{bookedTicketInfo.noOfTickets}</h5>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col s4 right-align">
                                            <h5>Movie Date :</h5>
                                        </div>
                                        <div class="col s3 push-s2">
                                            <h5>{bookedTicketInfo.movieDate}</h5>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col s4 right-align">
                                            <h5>Movie Show :</h5>
                                        </div>
                                        <div class="input-field col s3 push-s2">
                                            <h5>{bookedTicketInfo.movieShow}</h5>
                                        </div>
                                    </div>
                            </p>
                        </div>
                        <div class="modal-footer">
                            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
                        </div>
                    </div>
                </>
            )
        })
    );
}

export default Movies;