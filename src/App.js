import { useEffect, useState } from 'react';
import M from "materialize-css";
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import axios from 'axios';
var Cookies = require('js-cookie');

function App() {

  const dbUrl = "http://localhost:3003";
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Init Tabs Materialize JS
    var elems = document.querySelectorAll('.modal');
    window.M.Modal.init(elems);

    elems = document.querySelectorAll('.dropdown-trigger');
    window.M.Dropdown.init(elems);

  });

  const fetchMovies = () => {

    // desc: "Six strangers find themselves in a maze of deadly mystery rooms and must use their wits to survive."
    // poster: "https://m.media-amazon.com/images/M/MV5BMjQ2NDMwMTY3MF5BMl5BanBnXkFtZTgwNDg5OTc1NjM@.jpg"
    // title: "Escape Room "
    // trailer: "https://www.imdb.com/videoplayer/vi1755167257"
    // year: "2019"

    //axios request to fetch movies and info about it
    axios.get(dbUrl + "/movies")
      .then(function (response) {
        console.log(response.data.length)
        if (response.data.length === 12) {
          console.log(response.data)
          setMovies(response.data);
        }else{
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
                <a class='dropdown-trigger right' href='#' data-target='dropdown1'>Hi {Cookies.get('Name')} <i class="material-icons right">arrow_drop_down</i></a>

                {/* <!-- Dropdown Structure --> */}
                <ul id='dropdown1' class='dropdown-content'>
                  <li><a href="#!">Profile</a></li>
                  <li><a href="#!">Offers</a></li>
                  <li><a href="#!" onClick={handleLogout}>Logout</a></li>
                </ul>
              </>
              :
              <>
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
      <div className="container row">{
        movies.map((elm, index) => {
          // {console.log(elm)}
          return (
            <div className="col s12 m6 l3">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src={elm.poster} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">{elm.title}</span>
                  <p><a href="#">This is a link</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4 center">{elm.title}<i className="material-icons right">close</i></span>
                  <p>{elm.desc}</p>
                </div>
              </div>
            </div>
          )
        })}
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
            {/* <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a> */}
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
