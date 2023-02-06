import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

const Currencies = ({ setCoeff, coeff }) => {
const myHeaders = new Headers();
myHeaders.append('apikey', 'R4XEYth6VIZKDBOEqDC7YvgpQOq1L5hZ'); // original api-key :BDSNLNdLAxmKMDoOnCZn1uzPQn3jK0q5

const [ls, setLs] = useState([]);
// const [l, setL] = useState(['USD', 1]);
const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders,
};

    useEffect(() => {
        //   fetch('https://currency-exchange.p.rapidapi.com/listquotes', options)
        //   .then(response => response.json())
        //   .then(response => setLs(response))
        fetch('https://api.apilayer.com/exchangerates_data/symbols', requestOptions)
        .then((response) => response.json())
        .then((result) => setLs(Object.keys(result?.symbols)));
        }, []);

        function handlechange(ev) {
            if (coeff[0] !== ev) {
               fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${ev}&from=USD&amount=1`, requestOptions)
               .then((response) => response.json())
               .then((res) => {
                      setCoeff([ev, res.result]);
                    });
            }
      }
      // console.log(l);

return (
  <Select
    showSearch
    onChange={(e) => handlechange(e)}
    defaultValue={coeff[0]}
    style={{ float: 'right', marging: '5px', width: '80px' }}
  >
    {ls.map((d) => <Option value={d}>{d} </Option>)}
  </Select>
  );
};

export default Currencies;
