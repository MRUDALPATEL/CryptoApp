import React, { useState } from 'react';
import { Typography, Row, Col, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../Services/CryptoNewsApi';
import Loader from './Loader';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
const { Text, Title } = Typography;

const News = ({ simplified }) => {
  const [newsCategory] = useState('Cryptocurrency');
  const newsCount = simplified ? 10 : 20;

  const { data, isFetching, isError } = useGetCryptoNewsQuery({ newsCategory, count: newsCount });

  if (isFetching) return <Loader />;
  if (isError || !data?.data) return <div>⚠️ Error fetching news.</div>;

  const newsList = data.data.slice(0, newsCount); // ✅ Enforce limit

  return (
    <Row gutter={[24, 24]}>
      {newsList.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Title className="news-title" level={4} style={{ flex: 1 }}>{news.title}</Title>
                <img
                  src={news.thumbnail || demoImage}
                  alt="news"
                  style={{ maxWidth: '100px', maxHeight: '100px', marginLeft: '10px', objectFit: 'cover' }}
                />
              </div>
              <p>
                {news.description?.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <Text className="provider-name">Crypto Daily</Text>
                <Text>{moment(news.createdAt).fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
