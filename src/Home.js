import App from './App';
import History from './Components/History/History';
import Offers from './Components/Offers/Offers';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
var Cookies = require('js-cookie');

const Home = () => {

    return (
        <Router>

            <Switch>
                <Route path='/' exact component={App} />
                <Route path='/history' component={(props) => <History email={Cookies.get('Email')} />} />
                <Route path='/offers' component={(props) => <Offers />} />
            </Switch>

        </Router>
    )

}

export default Home;