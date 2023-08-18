function omitProperties<T extends object, K extends keyof T>(obj: T, propertiesToOmit: K | K[]): Omit<T, K> {
  const propsToOmit = Array.isArray(propertiesToOmit) ? propertiesToOmit : [propertiesToOmit];

  const result = Object.keys(obj).reduce((acc, prop) => {
    if (!propsToOmit.includes(prop as K)) {
      return { ...acc, [prop]: obj[prop as K] };
    }
    return acc;
  }, {} as Partial<T>);

  return result as Omit<T, K>;
}

// Example

interface Person {
  name: string;
  age: number;
  country: string;
}

const person: Person = {
  name: "John",
  age: 30,
  country: "USA",
};

const newPersonWithoutAge = omitProperties(person, ["age"]);
console.log(newPersonWithoutAge);

export default omitProperties;
