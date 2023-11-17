
<div align="center">

# UniSoft Utils

![unisoft-logo.png](unisoft-logo.png)

</div>

## About

This package is a part of the UniSoft project, a powerful website builder. UniSoft Utils is a collection of utility functions designed to expedite the development process. These utilities have been carefully extracted from the main project to benefit the wider development community. They offer a variety of functionalities such as managing strings, arrays, objects, as well as filtering and recursive operations.

One of the standout features of this package is its powerful conditional logic which is extremely versatile and can be used for classNames, attributes, properties, and more.

## Features

- **Setters**: Functions to set specific values.
- **Getters**: Functions to retrieve specific values.
- **Collectors**: Functions to collect data.
- **Transformers**: Functions to transform data from one form to another.
- **Helpers**: Miscellaneous helper functions.
- **Evaluators**: Functions to evaluate conditions and expressions.
- **Checkers**: Functions to check various conditions.
- **Filters**: Functions to filter data based on specific conditions.

### Powerful Conditional Logic

UniSoft Scripts comes with a unique feature that allows conditional logic to be applied in a versatile way. This feature can be used for controlling classNames, attributes, properties and much more. You can provide conditions as simple strings and optionally specify the expected `true` and `false` values. You can also provide an object containing data to be used in evaluating these conditions.

## Installation

To install the package, run:

`npm install unisoft-utils`

Or

`yarn add unisoft-utils`

## Usage

Here is how you can import the functionalities:

```tsx
import * as Setters from 'unisoft-utils/setters';

import * as Getters from 'unisoft-utils/getters';
```
### Example

```tsx
import { Filters } from 'unisoft-utils';


const data = { key1: 'value1', key2: 'value2' };
const keys = ['key1'];
const filteredData = Filters.sanitizeWithKeys(data, keys);`
```

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to learn about how you can contribute to this project.

## License

This project is licensed under [MIT License](LICENSE).
