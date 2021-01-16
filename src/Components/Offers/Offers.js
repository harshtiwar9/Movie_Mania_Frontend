
const Offers = () => {

    let dt = new Date();
    const weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return (
        <>
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
                        <td>
                            {
                                dt.getDay() != 1 || 2 ?
                                    <a class="waves-effect waves-light btn disabled tooltipped" data-position="bottom" data-tooltip="Only available on Monday and Tuesday">Buy <i class="material-icons left">add_shopping_cart</i></a>
                                    :
                                    <a class="waves-effect waves-light btn">Buy <i class="material-icons left">add_shopping_cart</i></a>
                            }

                        </td>
                    </tr>
                    <tr>
                        <td>Get 5% discount for next 5 Movies</td>
                        <td>$10</td>
                        <td>
                            {
                                dt.getDay() != 1 || 5 ?
                                    <a class="waves-effect waves-light btn disabled tooltipped" data-position="bottom" data-tooltip="Only available on Monday and Friday">Buy <i class="material-icons left">add_shopping_cart</i></a>
                                    :
                                    <a class="waves-effect waves-light btn">Buy <i class="material-icons left">add_shopping_cart</i></a>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Gift Card</td>
                        <td>$25</td>
                        <td><a class="waves-effect waves-light btn">Buy <i class="material-icons left">add_shopping_cart</i></a></td>
                    </tr>
                </tbody>
            </table>
        </>
    )

}

export default Offers;