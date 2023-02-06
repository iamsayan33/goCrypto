import React, { useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';
import Currencies from './Currencies';

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(20);
  const globalStats = data?.data?.stats;
  const [coeff, setCoeff] = useState(['USD', 1]);
  // const [fe, setFe] = useState(false);

  if (isFetching) return <Loader />;
  // console.log(coeff[0]);
  return (
    <>
      <Title level={2} className="heading">Global Crypto Statsy</Title>
      <Currencies setCoeff={setCoeff} coeff={coeff} />
      <Row gutter={[32, 32]}>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats?.total} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats?.totalExchanges)} /></Col>
        <Col span={12}><Statistic title="Total Market Cap:" value={`${coeff[0]} ${millify(Number(globalStats?.totalMarketCap) * coeff[1])}`} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={`${coeff[0]} ${millify(Number(globalStats?.total24hVolume) * coeff[1])}`} /></Col>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(globalStats?.totalMarkets)} /></Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Cryptos In The World</Title>
        <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">Latest Crypto News</Title>
        <Title level={3}><Link to="/news">Show more</Link></Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
