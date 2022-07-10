// 1.1 Что будет выведено в консоль? Как это исправить?
for (var i = 0; i < 100; i++) {
    setTimeout(() => {
        console.log(i);
    })
}
// 1.2 Что будет в консоли? Как это исправить?
const dog = {
    name: 'Bobik',
    sayName() {
        console.log(this.name)
    }
};
const sayName = dog.sayName;
sayName();

// 2.1 В каком порядке будут выведены console.logs и с каким значением.
var a = 5;
setTimeout(function timeout() {
    console.log('1', a);
    a = 10;
}, 0);

var p = new Promise(function(resolve, reject) {
    console.log('2', a);
    a = 25;
    resolve();
});

p.then(function(){
    console.log('3', a);
});

console.log('4', a);

// 2 5
// 4 25
// 3 25
// 1 25
