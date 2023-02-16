import { v4 as uuidv4 } from 'uuid';

export default class Helpers {
  static generateUUID(): string {
    return uuidv4();
  }

  static generateRandomCharacters(length = 20): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    return result;
  }
}
