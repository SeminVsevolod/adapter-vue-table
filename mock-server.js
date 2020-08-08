const http = require('http');
const url = require('url');

/**
 * Строки
 */
const rows = [
  {
    name: 'Манго',
    price: '200 руб',
    totalCell: '73'
  },
  {
    name: 'Яблоки',
    price: '75 руб',
    totalCell: '865'
  },
  {
    name: 'Апельсины',
    price: '60 руб',
    totalCell: '341'
  },
  {
    name: 'Мандарины',
    price: '50 руб',
    totalCell: '156'
  },
  {
    name: 'Персики',
    price: '75 руб',
    totalCell: '986'
  },
  {
    name: 'Помидоры',
    price: '80 руб',
    totalCell: '1243'
  },
  {
    name: 'Огурцы',
    price: '30 руб',
    totalCell: '2463'
  },
  {
    name: 'Лук',
    price: '15 руб',
    totalCell: '875'
  },
  {
    name: 'Картоха',
    price: '8 руб',
    totalCell: '2098'
  },
  {
    name: 'Клубника',
    price: '250 руб',
    totalCell: '68'
  },
  {
    name: 'Черешня',
    price: '300 руб',
    totalCell: '865'
  },
  {
    name: 'Абрикосы',
    price: '60 руб',
    totalCell: '941'
  },
  {
    name: 'Черника',
    price: '450 руб',
    totalCell: '152'
  },
  {
    name: 'Малина',
    price: '280 руб',
    totalCell: '1586'
  },
  {
    name: 'Петрушка',
    price: '15 руб',
    totalCell: '234'
  },
  {
    name: 'Грецкий орех',
    price: '50 руб',
    totalCell: '1200'
  },
  {
    name: 'Кешью',
    price: '800 руб',
    totalCell: '700'
  },
  {
    name: 'Фисташки',
    price: '70 руб',
    totalCell: '3870'
  },
  {
    name: 'Арахис',
    price: '70 руб',
    totalCell: '3870'
  },
  {
    name: 'Фундук',
    price: '70 руб',
    totalCell: '3870'
  },
  {
    name: 'Лимон',
    price: '70 руб',
    totalCell: '3870'
  }
];

/**
 * Колонки
 */
const columns = [
  {
    type: 0,
    key: 'name',
    label: 'Название товара'
  },
  {
    type: 0,
    key: 'price',
    label: 'Цена'
  },
  {
    type: 2,
    key: 'totalCell',
    label: 'Продаж за месяц'
  }
];

/**
 * Создаем простое API с пагинацией
 */
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 дней
    'Content-type': 'application/json'
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (pathname === '/products' && req.method === 'GET') {
    try {
      if (query.page && query.page < 1) {
        throw new Error('page должно быть больше 0');
      }
      if (query.perPage && query.perPage < 1) {
        throw new Error('perPage должно быть больше 0');
      }

      const page = parseInt(query.page || 1);
      const perPage = parseInt(query.perPage || 10);
      const total = parseInt(rows.length);
      const lastPage = parseInt(Math.ceil(total / perPage));
      const beginIndex = parseInt(perPage * (page - 1));
      const endIndex = parseInt(perPage * page);

      res.writeHead(200, headers);
      res.end(
        JSON.stringify({
          page,
          perPage,
          total,
          lastPage,
          rows: rows.slice(beginIndex, endIndex),
          columns
        })
      );
    } catch (error) {
      console.log('error', error);
      res.writeHead(400, {
        'Content-type': 'application/json'
      });
      res.end(
        JSON.stringify({
          error: error.message
        })
      );
    }
    return;
  }

  res.writeHead(404, {
    'Content-type': 'application/json'
  });
  res.end(
    JSON.stringify({
      error: `${req.method.toUpperCase} ${pathname} not found`
    })
  );
});

const port = 3000;

server.listen(port, '127.0.0.1', () => {
  console.log(`Listening to requests on port ${port}`);
});
