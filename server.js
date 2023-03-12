const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const friends = [
        {
            id: 0,
            name: 'Ahmed',
        },
        {
            id: 1,
            name: 'Ali Adel',
        },
        {
            id: 2,
            name: 'Mohamed',
        },
        {
            id: 3,
            name: 'Elon',
        },
    ];
    const items = req.url.split('/');
    if (req.method === 'POST' && items[1] === 'friends') {
        req.on('data', (data) => {
            const friend = data.toString();
            console.log('Request', friend);
            friends.push(JSON.parse(friend));
        });
    } else if (req.method === 'GET' && items[1] === 'friends') {
        res.writeHead(200, {
            'Content-Type': 'application/json',
        });
        if (items.length === 3) {
            const friendIndex = Number(items[2]);
            res.end(JSON.stringify(friends[friendIndex]));
        } else {
            res.end(JSON.stringify(friends));
        }
    } else if (req.method === 'GET' && items[1] === 'messages') {
        // Handle messages endpoint
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(`<html>
      <body>
        <ul>
          <li>
            Hello Ali
          </li>
        </ul>
      </body>
    </html>`);
        res.end();
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/plain',
        });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
