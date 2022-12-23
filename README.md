# Season API

An API to get current season or season by a specified month.

## Acknowledgements

- [Season API](https://github.com/Sohom829/SeasonAPI)
- [About Season API](https://github.com/Sohom829/SeasonAPI/blob/main/README.md)

## API Reference

### Get all items

```http
  GET /get-current-season
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/get-season/?month=${month}
```

**NOTE:** Use month by it's number 1-12

| Parameter | Type     | Description                                   |
| :-------- | :------- | :-------------------------------------------- |
| `month`   | `number` | **Required**. Number of month to fetch season |

## Features

- Custom month
- Always current month
- Open Souce

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

## Authors

- [@Sohom829](https://www.github.com/Sohom829)
