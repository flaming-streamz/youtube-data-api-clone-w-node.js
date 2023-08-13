function omitProperties<T extends {}>(obj: T, property: keyof T | (keyof T)[]) {
  if (Array.isArray(property)) {
    const entries = Object.entries(obj).filter(objItem => {
      const [key] = objItem;
      return !property.includes(key as keyof T);
    });

    return Object.fromEntries(entries);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {[property]: _, ...rest} = obj;

    return rest;
  }
}

export default omitProperties;
