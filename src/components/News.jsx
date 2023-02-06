import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 18 : 51 });

  if (!cryptoNews?.news) return <Loader />;
  let ar = cryptoNews.news;
  // ar = ar.slice().sort((a, b) => b.publish_date - a.publish_date);
  // ar.slice().reverse();
  ar = ar.slice(0, ar.length).reverse();
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
          </Select>
        </Col>
      )}
      {ar.map((news) => (
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.title}</Title>
                <img src={news.image || demoImage} alt="" style={{ height: '80px', width: '80px' }} />
              </div>
              <p>{news.text.length > 100 ? `${news.text.substring(0, 100)}...` : news.text}</p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.image || demoImage} alt="" />
                  <Text className="provider-name">{news.title.length > 73 ? `${news.title.substring(0, 73)}...` : news.title}</Text>
                </div>
                <Text>{moment(news.publish_date).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
    );
    };
    export default News;
      /* {cryptoNews.news.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.title}</Title>
                <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" />
              </div>
              <p>{news.text.length > 100 ? `${news.text.substring(0, 100)}...` : news.text}</p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.publish_date).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))} */
/* //   );
// };  */

