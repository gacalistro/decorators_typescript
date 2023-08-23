// Class Decorator
function apiVersion(version: string) {
  return (target: any) => {
    Object.assign(target.prototype, { __version: version });
  };
}

@apiVersion("1.1")
class Api {}

const api = new Api();

// console.log(api.__version);

// Attribute Decorator
function defineName(length: number) {
  return (target: any, key: string) => {
    let _value = target[key];

    const getter = () => _value;
    const setter = (value: string) => {
      if (value.length < length) {
        throw new Error(`Name must have at least ${length} characters.`);
      } else {
        _value = value;
      }
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
    });
  };
}

class Character {
  @defineName(3)
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const character = new Character("Arkeus");

// console.log(character.name);
