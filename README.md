# docker-nestjs default setting

## 개발환경

``` bash
node: 20.15.0
typescript: 5.5.2
mysql: 8.0.36
```

## 명령어

### develop run

```bash
yarn dev
```

### prod run

```bash
yarn start
```

### test run

- yarn test:docker:up - test db run
- yarn test - e2e test
- yarn test:docker:down - test db down

```bash
yarn test:docker:up
yarn test
```
