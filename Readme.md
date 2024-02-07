# HTTP(S) Load Tester

## How to try it

- clone the repo
- Run npm install.

- Open three terminals.
- Start the test server: npm run test-server.
- Run build, it is in watch mode: npm run build.
- Call to the test server: node dist/index.js -u http://localhost:3000/ (this does one request)

## Or

- run npm link
- `load-tester -u http://example.com -n 10 -c 2`

## Three ways of testing

### Once

```
node dist/index.js -u http://localhost:8080/
```

-u is always required. Specifying the URL.

### Linear

```
  node dist/index.js -u http://localhost:8080/ -n 100
```

This would make 100 requests. One after another. Linearly.

### Concurrent

```
  node dist/index.js -u http://localhost:8080/ -n 100 -c 5
```

This would make 100 requests. 5 running concurrently at a time.

## All flags

-u -> URL (required)

-n -> how many requests in total (optional)

-c -> How many requests should run concurrently at a time (optional)
