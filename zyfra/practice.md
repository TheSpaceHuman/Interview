
### 1

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

### 2

```js
// Какова последовательность console.log?
console.log(1);

Promise.resolve(2).then(console.log);

console.log(3);

setTimeout(() => console.log(4), 0);

console.log(5);
```

### 3
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

### 4

```ts
// Как можно улучшить данный код?
@Component({
  selector: 'repository-list',
  template: `
    <h1>Репозитории пользователя {{ username }}</h1>
    <ul>
      <li *ngFor="let repository of repositories$ | async">
        {{ repository.name }}
      </li>
    </ul>
    <div *ngIf="!(haveRepositories$ | async)">
      Нет репозиториев
    </div>
  `,
})
export class RepositoryListComponent {
  @Input() username: string;

  public repositories$: Observable<RepositoryInfo[]>;
  public haveRepositories$: Observable<boolean>;

  constructor() {
    const repositoryInfoService = new RepositoryInfoService();

    this.repositories$ = repositoryInfoService.getRepositoryListForUser(this.username);
    this.haveRepositories$ = this.repositories$.pipe(
      map((repositories) => repositories?.length > 0)
    );
  }
}
```
