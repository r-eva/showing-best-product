import React, {useState} from 'react';
import LocalData from '../DATABASE/data.json'
import './Landing.css'

const Landing = () => {
    const [data] = useState(LocalData)

//// First Render All Data
    const renderTableData = () => {
        let jsx = data.map((val) => {
            return (
            <tr key={val.ID}>
               <td>{val.ID}</td>
               <td>{val.Make}</td>
               <td>{val.Model}</td>
               <td>{val.Price}</td>
               <td>{val.UserID}</td>
               <td>{val.Date}</td>
            </tr>
            )
        })
        return jsx
    }

    const renderTableHeader = () => {
        let header = Object.keys(data[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

///// Get best seller product /////////

    /// Get best seller Bike ///
    const getBestSellerBike = () => {

        /// Trim all product model///
        const trimData = data.map(item => {
            return {...item, Model: item.Model.replace(/-/g, ' ').toUpperCase()}
        })

        /// Get list of unique model
        const getUniqueList = (inputData, key) => {
            return [...new Map(inputData.map(item => [item[key], item])).values()]
        }
        const uniqeModelData = getUniqueList(trimData, 'Model')

        /// Add number of appearance in list of unique model
        const addNumber = uniqeModelData.map(item => {
            let count = trimData.filter((obj) => obj.Model === item.Model).length
            return {...item, Number: count}
        })

        /// Sort List Product
        let listProductSold = addNumber.sort(function(a, b){return b.Number-a.Number})
        
        /// Get 3 best Product and shows the Producer and Model
        let rank = 1
        let bestProduct = []
        for (let i = 0; i < listProductSold.length; i++) {
            // increase rank only if current score less than previous
            if (i > 0 && listProductSold[i].Number < listProductSold[i - 1].Number) {
              rank++;
            }
            if (rank > 3) {
                break
            } else {
                bestProduct.push(listProductSold[i]);
            }
        }
        
        let showBestProduct = bestProduct.map(item => {
            return {Make: item["Make"], Model: item["Model"], Number: item["Number"]}
        })

        return showBestProduct
    }

    /// Render Best Seller Bike ///

    const renderBestSeller = () => {
        let bestProductList = getBestSellerBike()
        let jsx = bestProductList.map((val) => {
            return (
            <tr key={val.Model}>
               <td>{val.Make}</td>
               <td>{val.Model}</td>
               <td>{val.Number}</td>
            </tr>
            )
        })
        return jsx
    }

    return (
        <div className="container">
            <h1 className="title">OUR BikEEE AVAILABLE</h1>
            <table className="allBike">
                <tbody>
                    <tr>
                        {renderTableHeader()}
                    </tr>
                    {renderTableData()}
                </tbody>
            </table>
            <h1>MOST FREQUENTLY ADVERTISE BiKeee MODEL</h1>
            <table className="allBike">
                <tbody>
                    <tr>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Number of Advertise</th>
                    </tr>
                    {renderBestSeller()}
                </tbody>
            </table>
        </div>
    );
};

export default Landing;