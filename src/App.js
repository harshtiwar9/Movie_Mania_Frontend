import { useEffect, useState } from 'react';
import M from "materialize-css";
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import Movies from './Components/Movies/Movies';
import Loading from './Components/Loading/Loading';
import History from './Components/History/History';
import Offers from './Components/Offers/Offers';
import axios from 'axios';
var Cookies = require('js-cookie');

function App() {

  const dbUrl = "http://localhost:3003";
  const [movies, setMovies] = useState([]);
  const [showWhichComponent, setShowWhichComponent] = useState("movies");

  useEffect(() => {

    let dt = new Date();
    // Init Tabs Materialize JS
    var elems = document.querySelectorAll('.modal');
    window.M.Modal.init(elems);

    elems = document.querySelectorAll('.dropdown-trigger');
    window.M.Dropdown.init(elems);

    elems = document.querySelectorAll('.sidenav');
    window.M.Sidenav.init(elems);

    elems = document.querySelectorAll('select');
    window.M.FormSelect.init(elems);

    elems = document.querySelectorAll('.datepicker');
    window.M.Datepicker.init(elems, {
      minDate: new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()),
      maxDate: new Date(dt.getFullYear(), dt.getMonth() + 1, dt.getDate()),
    });

    elems = document.querySelectorAll('.tooltipped');
    window.M.Tooltip.init(elems);

  });

  const fetchMovies = () => {

    //axios request to fetch movies and info about it
    axios.get(dbUrl + "/movies")
      .then(function (response) {
        console.log(response.data.length)
        if (response.data.length === 12) {
          console.log(response.data)
          setMovies(response.data);
        } else {
          fetchMovies();
        }

      })
      .catch(function (error) {
        console.log(error);
      })

  }

  useEffect(fetchMovies, []);

  //handle Signup Form
  const handleSignup = (e) => {
    e.preventDefault();

    const data = {
      name: e.target.signup_name.value,
      email: e.target.signup_email.value,
      pass: e.target.signup_pass.value
    }

    axios.post(dbUrl + "/signup", data)
      .then(function (response) {
        console.log(response.data);
        if (response.data.Code === 200) {
          window.M.toast({ html: 'You are registered succefully! \n Login with your credentials!' })
        } else if (response.data.Code === 403) {
          window.M.toast({ html: 'Email already registered!' })
        }
      })
      .catch(function (error) {
        console.log({ error })
        window.M.toast({ html: 'Email already registered!' })
      })

  }

  //handle Login Form
  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      email: e.target.login_email.value,
      pass: e.target.login_pass.value
    }

    axios.post(dbUrl + "/login", data)
      .then(function (response) {
        console.log(response.data);
        if (response.data.Code === 200) {
          Cookies.set('AuthToken', response.data.AuthToken, { expires: response.data.maxAge })
          Cookies.set('Name', response.data.name, { expires: response.data.maxAge })
          Cookies.set('Email', response.data.email, { expires: response.data.maxAge })
          window.location.href = "http://localhost:3000";
          window.M.toast({ html: 'Welcome ' + response.data.name + " !" })
        } else if (response.data.Code === 403) {
          window.M.toast({ html: response.data.message })
        }
      })
      .catch(function (error) {
        console.log({ error })
        window.M.toast({ html: 'Error!' })
      })

  }

  //handle Logout
  const handleLogout = (e) => {
    e.preventDefault();

    const data = {
      token: Cookies.get('AuthToken'),
      email: Cookies.get('Email')
    }

    axios.post(dbUrl + "/logout", data)
      .then(function (response) {
        console.log(response.data);
        if (response.data.success === true) {
          Cookies.remove('AuthToken');
          Cookies.remove('Email');
          Cookies.remove('Name');
          window.M.toast({ html: 'You are logged out!' })
          window.location.href = "http://localhost:3000";
        } else if (response.data.success === false) {

        } else {
          alert("Error while Logout!");
        }
      })
      .catch(function (error) {
        console.log({ error })
        window.M.toast({ html: 'Error!' })
      })

  }

  return (
    <div className="App">

      {/* Nav bar */}
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo center">Movie Mania</a>

          {
            Cookies.get('AuthToken') != null || "" ?
              <>
                {/* <!-- Dropdown Trigger --> */}
                <a class='dropdown-trigger right hide-on-med-and-down' href='#' data-target='dropdown1'>Hi {Cookies.get('Name')} <i class="material-icons right">arrow_drop_down</i></a>

                {/* <!-- Dropdown Structure --> */}
                <ul id='dropdown1' class='dropdown-content'>
                  <li><a href="#!">Profile</a></li>
                  <li><a href="#!">Offers</a></li>
                  <li><a href="#!" onClick={handleLogout}>Logout</a></li>
                </ul>

                <ul id="nav-mobile" class="right hide-on-med-and-down">
                  <li><a href="#!">Offers</a></li>
                  <li><a href="#!">History</a></li>
                </ul>

                <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                <ul class="sidenav" id="mobile-demo">
                  <li className="black-text"><h4>Hi {Cookies.get('Name')}!</h4></li>
                  <hr />
                  <li><a href="#!">Profile</a></li>
                  <li><a href="#!" onClick={handleLogout}>Logout</a></li>
                </ul>
              </>
              :
              <>

                <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                <ul class="sidenav" id="mobile-demo">
                  <li><a href="#!">Offers</a></li>
                  <li><a href="#login" className="waves-effect waves-light modal-trigger">Login</a></li>
                  <li><a href="#signup" className="waves-effect waves-light modal-trigger">Signup</a></li>
                </ul>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><a href="#!">Offers</a></li>
                  <li><a href="#login" className="waves-effect waves-light modal-trigger">Login</a></li>
                  <li><a href="#signup" className="waves-effect waves-light modal-trigger">Signup</a></li>
                </ul>
              </>
          }
        </div>
      </nav>

      {/* Grid for Movies */}
      <div className="container center">
        <div className="row">
          {

            movies.length != 0 ?
              <Movies movies={movies} />
              :
              <Loading />

            // Cookies.get('Email') != undefined || "" || null ?
            //   <History email={Cookies.get('Email')} />
            //   : ""

            // Cookies.get('Email') != undefined || "" || null ?
            //   <Offers />
            //   : ""

          }
        </div>
      </div>



      {/* <!-- Modal Structure for Login --> */}
      <div id="login" className="modal login">
        <form onSubmit={handleLogin}>
          <div className="modal-content">
            <h4 className="center">Login</h4>
            <hr />
            <p>
              <div className="row">
                <div className="input-field col s12">
                  <input name="login_email" type="email" className="validate" />
                  <label for="login_email">Email</label>
                </div>
                <div className="input-field col s12">
                  <input name="login_pass" type="password" className="validate" />
                  <label for="login_pass">Password</label>
                </div>
              </div>
            </p>
          </div>
          <div className="modal-footer center">
            <div className="row">
              <div className="col s3 push-s3 center">
                <button className="btn waves-effect waves-light" type="submit" name="action">Login</button>
              </div>
              <div className="col s3 push-s3 center">
                <button className="btn waves-effect waves-light" type="reset" name="action">Reset</button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* <!-- Modal Structure for Signup --> */}
      <div id="signup" className="modal signup">
        <form onSubmit={handleSignup}>
          <div className="modal-content">
            <h4 className="center">Signup</h4>
            <hr />
            <p>
              <div className="row">
                <div className="input-field col s12">
                  <input name="signup_name" type="text" className="validate" />
                  <label for="signup_name">Full Name</label>
                </div>
                <div className="input-field col s12">
                  <input name="signup_email" type="email" className="validate" />
                  <label for="signup_email">Email</label>
                </div>
                <div className="input-field col s12">
                  <input name="signup_pass" type="password" className="validate" />
                  <label for="signup_pass">Password</label>
                </div>
              </div>
            </p>
          </div>
          <div className="modal-footer center">
            {/* <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a> */}
            <div className="row">
              <div className="col s3 push-s3 center">
                <button className="btn waves-effect waves-light" type="submit" name="action">Signup</button>
              </div>
              <div className="col s3 push-s3 center">
                <button className="btn waves-effect waves-light" type="reset" name="action">Reset</button>
              </div>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
}

export default App;
