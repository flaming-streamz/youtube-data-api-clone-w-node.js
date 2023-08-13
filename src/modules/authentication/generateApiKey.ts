import { customAlphabet } from "nanoid";

const CHARACTER_SET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
const API_KEY_SIZE = Number(process.env.API_KEY_SIZE as string) || 32;

export function generateApiKey() {
  const generatorFunc = customAlphabet(CHARACTER_SET);
  const value = generatorFunc(API_KEY_SIZE);
  return value;
}
