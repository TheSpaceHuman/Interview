# JS

1)

```js
// Что будет в console.log?
const userService = {
  currentFilter: 'active',
  users: [
  	{name: 'Petr', status: 'active'},
  	{name: 'Ivan', status: 'deleted'},
    {name: 'Sergey', status: 'deleted'},
  ],
  getFilteredUsers: function() {
      return this.users.filter(function (user) {
      	return user.status === this.currentFilter;
    });
  }
};

console.log(userService.getFilteredUsers());
```

2)

```js
// Какова последовательность console.log?
console.log(1);

Promise.resolve(2).then(console.log);

console.log(3);

setTimeout(() => console.log(4), 0);

console.log(5);
```

3)
```js
// Сколько уйдёт запросов и почему?
const obs$ = httpClient.get('https://zyfra.com');
const promise = fetch('https://zyfra.com');

obs$.subscribe(console.log);
obs$.subscribe(console.log);
obs$.subscribe(console.log);

promise.then(console.log);
promise.then(console.log);
promise.then(console.log);
```
