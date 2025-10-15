
class Person {
    public name: string;
    public lastName: string;
    public address: string = 'No address';

    constructor( name: string, lastName: string, address: string = 'No address' ) {
        this.name = name;
        this.lastName = lastName
        this.address = address;
    }
}

/* 
    HERENCIA
class Hero extends Person {
    public alterEgo: string;
    public age: number;
    public realName: string;

    constructor( alterEgo: string, age: number, realName: string) {
        super( realName, 'NY');
        this.alterEgo = alterEgo;
        this.age = age;
        this.realName = realName;
    }
}
*/

//  COMPOSICION
class Hero {
    public person: Person;
    public alterEgo: string;
    public age: number;
    public realName: string;

    constructor( alterEgo: string, age: number, realName: string, person: Person) {
        this.person = person;
        this.alterEgo = alterEgo;
        this.age = age;
        this.realName = realName;
    }
}


const person = new Person('Tony', 'Stark')
const ironMan = new Hero('Iron Man', 45, 'Tony', person)

console.log(ironMan)

export {
    Person,
    Hero
}