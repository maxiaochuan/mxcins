# Usage

### rest
* request('//mxcins.com/api/users.json') -> get users;
* request.get('//mxcins.com/api/users.json') -> get users;
* request.post('//mxcins.com/api/users.json', { data: {} }) -> create user;

### graphql
* request.query('//mxcins.com/api/graphql', `query { ... }`, variables) -> graphql query;


### build