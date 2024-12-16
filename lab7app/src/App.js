import React, { useState } from 'react';

const RequestForm = () => {
  const [requestType, setRequestType] = useState('hello');
  const [countMethod, setCountMethod] = useState('GET');
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url;
    let method = 'GET';
    let body = null;

    if (requestType === 'hello') {
      url = 'http://localhost:8080';
    } else if (requestType === 'query') {
      url = `http://localhost:9000/api/user?name=${inputValue}`;
    } else if (requestType === 'count') {
      url = 'http://localhost:3333';
      method = countMethod;
      if (countMethod === 'POST' && inputValue) {
        body = new URLSearchParams({ count: inputValue });
      }
    }

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      });
      const data = await res.text();
      setResponse(data);
    } catch (error) {
      setResponse('Ошибка при выполнении запроса');
    }
  };

  return (
    <div>
      <h1>Отправка запросов</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="radio"
              value="hello"
              checked={requestType === 'hello'}
              onChange={(e) => setRequestType(e.target.value)}
            />
            Hello
          </label>
          <label>
            <input
              type="radio"
              value="query"
              checked={requestType === 'query'}
              onChange={(e) => setRequestType(e.target.value)}
            />
            Query
          </label>
          <label>
            <input
              type="radio"
              value="count"
              checked={requestType === 'count'}
              onChange={(e) => setRequestType(e.target.value)}
            />
            Count
          </label>
        </div>
        {requestType === 'count' && (
          <div>
            <label>
              <input
                type="radio"
                value="GET"
                checked={countMethod === 'GET'}
                onChange={(e) => setCountMethod(e.target.value)}
              />
              GET
            </label>
            <label>
              <input
                type="radio"
                value="POST"
                checked={countMethod === 'POST'}
                onChange={(e) => setCountMethod(e.target.value)}
              />
              POST
            </label>
          </div>
        )}
        {(requestType === 'query' || (requestType === 'count' && countMethod === 'POST')) && (
          <div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={requestType === 'query' ? 'Введите имя' : 'Введите число'}
            />
          </div>
        )}
        <button type="submit">Отправить</button>
      </form>
      {response && <div>Ответ: {response}</div>}
    </div>
  );
};

export default RequestForm;

