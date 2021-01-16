import Navbar from '../Navbar/Navbar';

const Offers = () => {

    let dt = new Date();

    return (
        <>
            <Navbar />
            <h1 className="center">Offers</h1>
            <table className="centered responsive-table highlight">
                <thead>
                    <tr>
                        <th>Offer</th>
                        <th>Amount</th>
                        <th>Purchase</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>See any 5 Movies in a month</td>
                        <td>$40</td>
                        <td className={
                            dt.getDay() !== 1 || 2 ?
                            "tooltipped"
                            : ""
                        } data-position="bottom" data-tooltip="Only available on Mondays and Tuesdays!">
                            {
                                dt.getDay() !== 1 || 2 ?
                                    <a href="#!" class="waves-effect waves-light btn disabled tooltipped" data-position="bottom" data-tooltip="Only available on Monday and Tuesday">Buy <i class="material-icons left">add_shopping_cart</i></a>
                                    :
                                    <a href="#!" class="waves-effect waves-light btn">Buy <i class="material-icons left">add_shopping_cart</i></a>
                            }

                        </td>
                    </tr>
                    <tr>
                        <td>Get 5% discount for next 5 Movies</td>
                        <td>$10</td>
                        <td className={
                            dt.getDay() !== 1 || 5 ?
                            "tooltipped"
                            : ""
                        } data-position="bottom" data-tooltip="Only available on Mondays and Fridays!">
                            {
                                dt.getDay() !== 1 || 5 ?
                                    <a href="#!" class="waves-effect waves-light btn disabled tooltipped" data-position="bottom" data-tooltip="Only available on Monday and Friday!">Buy <i class="material-icons left">add_shopping_cart</i></a>
                                    :
                                    <a href="#!" class="waves-effect waves-light btn">Buy <i class="material-icons left">add_shopping_cart</i></a>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Gift Card</td>
                        <td>$25</td>
                        <td><a href="#!" class="waves-effect waves-light btn tooltipped" data-position="bottom" data-tooltip="Available Everyday!">Buy <i class="material-icons left">add_shopping_cart</i></a></td>
                    </tr>
                </tbody>
            </table>
        </>
    )

}

export default Offers;