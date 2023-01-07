# Season API

An API to get current season or season by a specified month.

## Acknowledgements

- [Season API](https://github.com/Sohom829/SeasonAPI)
- [About Season API](https://github.com/Sohom829/SeasonAPI/blob/main/README.md)

## API Reference

### Get all items

```http
  GET /api/get-current-season
```

| Parameter | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `api_key` | `string` | **Required**. Your API key                      |
| `country` | `string` | **Required** The country you want to get season |

**NOTE:** Use ISO code. e.g: Bangladesh = BD, United States of America = US.

#### Get item

```http
  GET /api/get-season/?month=${month}
```

**NOTE:** Use month by it's number 1-12

| Parameter | Type     | Description                                   |
| :-------- | :------- | :-------------------------------------------- |
| `month`   | `number` | **Required**. Number of month to fetch season |

## Features

- With current year
- Always update
- Custom month
- Always current month
- Open Source

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

## Authors

- [@Sohom829](https://www.github.com/Sohom829)
