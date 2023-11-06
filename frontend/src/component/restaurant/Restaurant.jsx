import { useState, useEffect } from 'react';
import './Restaurant.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Restaurant(props) {
    const [menuData, setMenuData] = useState({
        flag: false,
        foodData: null,
        drinkData: null
    });

    async function getData() {
        let backend_url = 'http://localhost:3200/data';
        let response = await fetch(backend_url);
        let responseData = await response.json();
        setMenuData({
            flag: true,
            foodData: responseData[0],
            drinkData: responseData[1]
        });
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='pri'>
            <div>
                <h1> Food Menu</h1>

<div className='food-container'>
                {
                    menuData.flag ? menuData.foodData.map(item => {
                        return   <Card className= 'food-item' style={{ width: '18rem' }} key={item.foodName}>
                        <Card.Img variant="top" src={'images/food/' + item.foodName + '.jpg'} />
                        <Card.Body className={(item.category === 'veg') ? 'veg' : 'non-veg'}>
                          <Card.Title>{item.foodName} : {item.price} </Card.Title>
                          <Card.Text>
                          {item.foodName} is an amazing Dish. You should try it.
                          </Card.Text>
                          Category:
                          <img onScroll={(item.category === 'veg') ? 'images/veg.png' : 'images/non-veg.png'}
                          height="30px" width="30px" />
                          <Button variant="primary">Buy Now</Button>
                        </Card.Body>
                      </Card>
                    }) : <h1>Loading</h1>
                }

</div>

                <h1> Drink Menu</h1>

                {
                    menuData.flag ? menuData.drinkData.map(item => {
                        return <li key={item.drinkName}>
                            Drink Name is {item.drinkName}, Price: {item.price}, Category: {item.category}
                        </li>
                    }) : <h1>Loading</h1>
                }






            </div>


        </div>
    );
}

export default Restaurant;