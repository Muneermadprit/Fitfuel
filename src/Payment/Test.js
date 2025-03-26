import React from 'react'
import Axios from './Helpers'

export default function Test() {
    const handleLogin = async (e) => {

        try {
            e.preventDefault()
            const { data } = await Axios.post('user/login', {
                "userName": "saju",
                "password": "0000"
            })
            debugger
            if (data.status) {
                alert('success login')
            } else {
                alert('failed login')
            }
        } catch (error) {
            console.error(error)
            alert('login failed')
        }
    }

    const handelAddToCart = async (e) => {
        try {
            const { data } = await Axios.post('user/add-to-cart', {
                "package": "67d489300f5a4c86a97ccce6",
                "startDate": "2025-03-21",
                "endDate": "2025-03-28",
                "selectedMeals": [
                    {
                        "date": "2025-03-21",
                        "meals": ["67d07f2147ccaa7eeca61c73"]
                    },
                    {
                        "date": "2025-03-22",
                        "meals": ["67d07fa7aeb68d386fb4c6dd"]
                    },
                    {
                        "date": "2025-03-23",
                        "meals": ["67d07fcdaeb68d386fb4c6e5", "67d07fc4aeb68d386fb4c6e3"]
                    },
                    {
                        "date": "2025-03-24",
                        "meals": ["67d07f2147ccaa7eeca61c73", "67d07fa7aeb68d386fb4c6dd"]
                    },
                    {
                        "date": "2025-03-25",
                        "meals": ["67d07fcdaeb68d386fb4c6e5", "67d07fbbaeb68d386fb4c6e1"]
                    },
                    {
                        "date": "2025-03-26",
                        "meals": ["67d07f9faeb68d386fb4c6db", "67d07f2147ccaa7eeca61c73"]
                    },
                    {
                        "date": "2025-03-27",
                        "meals": ["67d07fc4aeb68d386fb4c6e3"]
                    },
                    {
                        "date": "2025-03-28",
                        "meals": ["67d07fb0aeb68d386fb4c6df", "67d07fa7aeb68d386fb4c6dd"]
                    }
                ]
            })
            if(data){
                alert('succcess')
            }
        } catch (error) {
            console.error(error)
            alert('cart failed')
        }

    }
    return (
        <div>

            <button onClick={handleLogin}>login</button>
            <button onClick={handelAddToCart}>Add To cart</button>

        </div>
    )
}
