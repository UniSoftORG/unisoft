import { FlexibleObj, ExtractOptions } from "@utils";

/**
 * Recursively collects keys from an object based on the specified criteria.
 * @param obj The object to
 * @param collectKeys The keys to collect
 * @param childrenKey The key to use for children
 * @param options Additional options
 */
export function recursiveKeyCollection<
  ObjectType,
  KeyType extends string = string,
>(
  obj: FlexibleObj<ObjectType, KeyType>,
  collectKeys: KeyType | KeyType[],
  childrenKey: KeyType = "children" as KeyType,
  options?: ExtractOptions<KeyType>,
): KeyType[] {
  const keysSet = new Set([
    ...((options?.additionalProps as any[]) ?? []),
    ...(typeof collectKeys === "string"
      ? (obj[collectKeys] as KeyType[]) ?? []
      : collectKeys),
  ]);

  (obj[childrenKey] as FlexibleObj<ObjectType, KeyType>[])?.forEach(
    (child: FlexibleObj<ObjectType, KeyType>) => {
      recursiveKeyCollection(child, collectKeys, childrenKey).forEach((p) =>
        keysSet.add(p),
      );
    },
  );

  return Array.from(keysSet) as KeyType[];
}
