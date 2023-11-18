// import { DeepKeyOf } from '@/types/renderer';
//
// export function getProperty<T, Path extends DeepKeyOf<T>>(
//   obj: T,
//   path: Path
// ): any {
//   const keys = path.split('.') as Array<keyof T & string>;
//   let result: any = obj;
//
//   for (const key of keys) {
//     result = result[key];
//   }
//
//   return result;
// }