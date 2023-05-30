import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';

enum CloudType {
  Cloudy = 'Облачно',
  Clear = 'Ясно',
  Rain = 'Дождь',
  Drizzle = 'Мелкий дождь',
  Mist = 'Туман',
  None = '',
}

interface WeatherCard {
  celcius: number;
  name: string;
  humidity: number;
  speed: number;
  cloud: CloudType;
}

const Forecast: React.FC = () => {
  const [data, setData] = useState<WeatherCard>({
    celcius: 0,
    name: '',
    humidity: 0,
    speed: 0,
    cloud: CloudType.None,
  });
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const fetchData = () => {
    const apiUrl: string = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=75297dd427a167d5997bd922e0e3fb3d&units=metric`;
    axios
      .get(apiUrl)
      .then((res) => {
        let cloudPath: CloudType;
        switch (res.data.weather[0].main) {
          case 'Clouds':
            cloudPath = CloudType.Cloudy;
            break;
          case 'Clear':
            cloudPath = CloudType.Clear;
            break;
          case 'Rain':
            cloudPath = CloudType.Rain;
            break;
          case 'Drizzle':
            cloudPath = CloudType.Drizzle;
            break;
          case 'Mist':
            cloudPath = CloudType.Mist;
            break;
          default:
            cloudPath = CloudType.None;
            break;
        }

        setData({
          ...data,
          celcius: res.data.main.temp,
          name: res.data.name,
          humidity: res.data.main.humidity,
          speed: res.data.wind.speed,
          cloud: cloudPath,
        });

        setError('');
      })
      .catch((err: AxiosError) => {
        if (err.response && err.response.status === 404) {
          setError('Такого города нет');
        }
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  return (
    <div className="weather">
      <div className="weather__search__container">
        <div className="weather__search">
          <input
            className="weather__input"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Введите название города "
          />
          <button className="weather__btn" onClick={fetchData}>
            Поиск
          </button>
        </div>
        <div className="weather__input__error">
          <p>{error}</p>
        </div>
      </div>
      <div className="weather__info">
        <h1 className="weather__temp">{Math.round(data.celcius)}°C</h1>
        <h4 className="weather__cloud">{data.cloud}</h4>
        <h2 className="weather__city">{data.name}</h2>
        <div className="weather__info__details">
          <div className="weather__info__details__left-col">
            <p>Влажность</p>
            <p>{Math.round(data.humidity)}%</p>
          </div>
          <div className="weather__info__details__right-col">
            <p>Ветер</p>
            <p>{Math.round(data.speed)}км/ч</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;