# Angular questions
1. Что такое DI, IoC и инверсия зависимостей?
```
Внедрение зависимостей — это стиль настройки объекта, при котором поля объекта задаются внешней сущностью.

```
2. NgZone?
```
Зона - это контекст выполнения, который сохраняется для асинхронных задач,  а также предоставлять перехватчики жизненного цикла для асинхронных операций.
NgZone занимаеться обнаружения изменений в компоненте. Эта служба создает зону с именем angularдля автоматического запуска обнаружения изменений при выполнении следующих условий:
- Когда выполняется синхронная или асинхронная функция
- Когда нет microTaskрасписания
- run() дефолтное отслеживание
- runOutsideOfAngular() отключение реагирование на изменение
Для использования NgZone в ангуляре необходимо включить его в polyfills.ts
Для повышения производительности можно выключить requestAnimationFrame(), так же можно добавить в исключение событие mousemove и scroll
zone-flags.ts
(window as any).__Zone_disable_requestAnimationFrame = true;
(window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove'];
```
3. Обнаружение изменений?
```
View — это основной строительный блок для UI приложения. Это минимальная группа элементов, которые создаются и удаляются совместно.
Каждый view содержит ссылки на дочерние view в свойстве nodes и, таким образом, может производить действия на дочерних view.
Каждый view имеет состояние (свойство state), которое играет большую роль, потому как основываясь именно на его значении Angular принимает решение запускать ли обнаружение изменений для этого view и всех его дочерних.
ViewState:
- FisrtCheck
- ChecksEnabled
- Errored
- Destroyed
ChangeDetectorRef:
- markForCheck() - включения обнаружения для всех родительских компонентов, вплоть до корневого компонента
- detach() - отменяет проверки на текущем view
- reattach() - включает проверки
- detectChanges() - метод запускает обнаружение изменений для view текущего компонента, не взирая на его состояние, т.е. обнаружение может оставаться отключенным для текущего view и компонент не будет проверяться во время последующих регулярных запусков обнаружения
- checkNoChanges() - выбрасывает исключение, если связи (входящие свойства) были изменены
```
4. Angular dependency injection?
```
Angular облегчает взаимодействие между потребителями зависимостей и поставщиками зависимостей с помощью абстракции Injector . 
Когда запрашивается зависимость, инжектор проверяет свой реестр, чтобы увидеть, есть ли там уже доступный экземпляр. 
Если нет, новый экземпляр создается и сохраняется в реестре. 
Angular создает инжектор для всего приложения (также известный как «корневой» инжектор) во время процесса начальной загрузки приложения, а также любые другие инжекторы по мере необходимости.
```
5. Что можно положить в DI?
```
InjectionToken - объект ключи для системы DI Angular
- Мы можем переопределить значение токена на любом уровне дерева DI, никак не меняя компоненты, которые его используют.
- Мы можем мокировать значение токена подходящими данными при тестировании.
- Компонент полностью изолирован и всегда будет работать одинаково, независимо от контекста.

function pressedKeyFactory(documentRef: Document): Observable<string> {
  return fromEvent(documentRef.body, "keydown").pipe(
    map((event: KeyboardEvent) => event.key)
  );
}
{
  provide: PRESSED_KEY,
  // useValue: 'alt',
  deps: [DOCUMENT],
  useFactory: pressedKeyFactory,
}
```
6. Функции inject?
```
Позволяет избавиться от проксирования лишних зависимостей в дочерних классах

@Injectable()
abstract class Storage {
  private logger = inject(Logger);
}

@Injectable()
class LocalStorage extends Storage {
  constructor(private selfDependency: SelfDepService){
    super();
  }
}

enum InjectFlags {
  Default = 0,
  Host = 1,
  Self = 2,
  SkipSelf = 4,
  Optional = 8
}

import { Injectable, Optional } from "@angular/core";
import { SharedModule } from "./shared.module";

@Injectable({
  providedIn: SharedModule,
  useFactory: (instance: SingletonService) => instance ?? new SingletonService(),
  deps: [[new Optional(), SingletonService]]
})
export class SingletonService {
  constructor() {
    console.count("SingletonService constructed");
  }
}
```
7. Декоратор?
```
Декоратор – приём программирования, который позволяет взять существующую функцию и изменить/расширить её поведение.
```
8. Холодные и горячие потоки?
```
Холодный поток - это когда ваш наблюдаемый создает производителя
// COLD
var cold = new Observable((observer) => {
  var producer = new Producer();
  // have observer listen to producer here
});

ГОРЯЧИЙ поток, когда ваш наблюдаемый закрывается над производителем
// HOT
var producer = new Producer();
var hot = new Observable((observer) => {
  // have observer listen to producer here
});
```
