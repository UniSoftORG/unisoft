import { FunctionNames } from "@/types/uniFunctions";
import {
  addAfterAttributes,
  addBeforeAttributes,
  addValueToArrayAtIndexAttributes,
  afterAttributes,
  afterLastAttributes,
  arrayToObjectAttributes,
  assignPropAttributes,
  beforeAttributes,
  beforeLastAttributes,
  betweenAttributes,
  collapseAttributes,
  containsAllAttributes,
  containsAnyAttributes,
  convertArrayToClassStringAttributes,
  convertObjectToCssStringAttributes,
  createConditionAttributes,
  createObjectFromMapOptionsAttributes,
  createQueryStringAttributes,
  crossJoinAttributes,
  deepCloneAttributes,
  deepMergeAttributes,
  doesKeyExistAttributes,
  efficientPluckAttributes,
  ensureArrayAttributes,
  evaluateAttributes,
  evaluateExpressionAttributes,
  evaluateReplacementAttributes,
  excerptAttributes,
  excludeKeysAttributes,
  filterArrayAttributes,
  filterByKeysAttributes,
  filterNotNullAttributes,
  filterObjectByKeyAttributes,
  findMatchingColonAttributes,
  findMostFrequentAttributes,
  findObjectByValueAttributes,
  finishAttributes,
  firstAttributes,
  flattenAttributes,
  forEachRecursiveAttributes,
  forLoopRecursiveAttributes,
  forRecursiveAttributes,
  generateRandomPasswordAttributes,
  generateRandomStringAttributes,
  getAttributes,
  getValueAttributes,
  hasAnyKeyAttributes,
  hasKeyAttributes,
  headlineAttributes,
  isAccessibleAttributes,
  isArrayAttributes,
  isAsciiAttributes,
  isAssocAttributes,
  isAttributes,
  isJsonAttributes,
  isNullishAttributes,
  isUlidAttributes,
  isUrlAttributes,
  isUuidAttributes,
  joinArrayElementsAttributes,
  keyByAttributes,
  lastAttributes,
  limitAttributes,
  lowerAttributes,
  mapArrayValuesAttributes,
  mapObjectValuesAttributes,
  mapRecursiveAttributes,
  mapToKeysAttributes,
  maskAttributes,
  mergeObjectsAttributes,
  objectToArrayAttributes,
  omitByKeysAttributes,
  parseExpressionAttributes,
  pluckAttributes,
  prependObjectKeysWithAttributes,
  prependValueToArrayAttributes,
  processTemplateStringsAttributes,
  randomAttributes,
  recursiveKeyCollectionAttributes,
  removeValueAttributes,
  removeValueFromArrayAtIndexAttributes,
  replaceArrayAttributes,
  replaceBetweenAttributes,
  replaceDynamicTargetsAttributes,
  replaceEndAttributes,
  replaceFirstAttributes,
  replaceLastAttributes,
  replaceStartAttributes,
  resolveTemplateStringAttributes,
  reverseAttributes,
  sanitizeObjectKeysRecursiveAttributes,
  separateKeysAndValuesAttributes,
  setByDotNotationAttributes,
  setNestedValueAttributes,
  setValueAtPathInObjectAttributes,
  shuffleArrayAttributes,
  simpleDeepCloneAttributes,
  slugAttributes,
  snakeAttributes,
  sortArrayAttributes,
  sortArrayDescAttributes,
  sortRecursiveAscAttributes,
  sortRecursiveDescAttributes,
  splitByOperatorAttributes,
  squishAttributes,
  strWrapAttributes,
  studlyAttributes,
  substrAttributes,
  substrCountAttributes,
  substrReplaceAttributes,
  swapAttributes,
  titleAttributes,
  transformEntriesAttributes,
  transformObjectAttributes,
  ucsplitAttributes,
  undotAttributes,
  upperAttributes,
  wordCountAttributes,
  wordWrapAttributes,
} from "@/types/uniInterfaces";
import { ISetState } from "@/types/functions";

export type FunctionAttributesMap = {
  [FunctionNames.setState]: ISetState;
  [FunctionNames.isAccessible]: isAccessibleAttributes;
  [FunctionNames.hasKey]: hasKeyAttributes;
  [FunctionNames.hasAnyKey]: hasAnyKeyAttributes;
  [FunctionNames.containsAny]: containsAnyAttributes;
  [FunctionNames.containsAll]: containsAllAttributes;
  [FunctionNames.isUrl]: isUrlAttributes;
  [FunctionNames.isUuid]: isUuidAttributes;
  [FunctionNames.isUlid]: isUlidAttributes;
  [FunctionNames.is]: isAttributes;
  [FunctionNames.isAscii]: isAsciiAttributes;
  [FunctionNames.isJson]: isJsonAttributes;
  [FunctionNames.efficientPluck]: efficientPluckAttributes<any, any>;
  [FunctionNames.recursiveKeyCollection]: recursiveKeyCollectionAttributes<
    any,
    any
  >;
  [FunctionNames.createObjectFromMapOptions]: createObjectFromMapOptionsAttributes;
  [FunctionNames.flatten]: flattenAttributes<any>;
  [FunctionNames.deepClone]: deepCloneAttributes<any>;
  [FunctionNames.simpleDeepClone]: simpleDeepCloneAttributes<any>;
  [FunctionNames.generateRandomPassword]: generateRandomPasswordAttributes;
  [FunctionNames.generateRandomString]: generateRandomStringAttributes;
  [FunctionNames.isNullish]: isNullishAttributes;
  [FunctionNames.splitByOperator]: splitByOperatorAttributes;
  [FunctionNames.findMatchingColon]: findMatchingColonAttributes;
  [FunctionNames.parseExpression]: parseExpressionAttributes;
  [FunctionNames.evaluateExpression]: evaluateExpressionAttributes;
  [FunctionNames.evaluate]: evaluateAttributes;
  [FunctionNames.doesKeyExist]: doesKeyExistAttributes;
  [FunctionNames.isAssoc]: isAssocAttributes;
  [FunctionNames.isArray]: isArrayAttributes;
  [FunctionNames.findMostFrequent]: findMostFrequentAttributes;
  [FunctionNames.evaluateReplacement]: evaluateReplacementAttributes;
  [FunctionNames.mapToKeys]: mapToKeysAttributes<any, any>;
  [FunctionNames.filterByKeys]: filterByKeysAttributes<any>;
  [FunctionNames.omitByKeys]: omitByKeysAttributes<any>;
  [FunctionNames.removeValue]: removeValueAttributes<any>;
  [FunctionNames.random]: randomAttributes<any>;
  [FunctionNames.shuffleArray]: shuffleArrayAttributes<any>;
  [FunctionNames.sortArray]: sortArrayAttributes<any>;
  [FunctionNames.sortArrayDesc]: sortArrayDescAttributes<any>;
  [FunctionNames.sortRecursiveAsc]: sortRecursiveAscAttributes;
  [FunctionNames.sortRecursiveDesc]: sortRecursiveDescAttributes;
  [FunctionNames.filterArray]: filterArrayAttributes<any>;
  [FunctionNames.filterNotNull]: filterNotNullAttributes<any>;
  [FunctionNames.filterObjectByKey]: filterObjectByKeyAttributes<any, any>;
  [FunctionNames.sanitizeObjectKeysRecursive]: sanitizeObjectKeysRecursiveAttributes<any>;
  [FunctionNames.first]: firstAttributes<any>;
  [FunctionNames.get]: getAttributes<any, any>;
  [FunctionNames.last]: lastAttributes<any>;
  [FunctionNames.keyBy]: keyByAttributes<any>;
  [FunctionNames.pluck]: pluckAttributes<any, any>;
  [FunctionNames.getValue]: getValueAttributes<any>;
  [FunctionNames.findObjectByValue]: findObjectByValueAttributes<any>;
  [FunctionNames.after]: afterAttributes;
  [FunctionNames.afterLast]: afterLastAttributes;
  [FunctionNames.before]: beforeAttributes;
  [FunctionNames.beforeLast]: beforeLastAttributes;
  [FunctionNames.between]: betweenAttributes;
  [FunctionNames.substr]: substrAttributes;
  [FunctionNames.wordCount]: wordCountAttributes;
  [FunctionNames.ucsplit]: ucsplitAttributes;
  [FunctionNames.substrCount]: substrCountAttributes;
  [FunctionNames.crossJoin]: crossJoinAttributes<any, any>;
  [FunctionNames.createCondition]: createConditionAttributes;
  [FunctionNames.mapObjectValues]: mapObjectValuesAttributes<any, any>;
  [FunctionNames.transformEntries]: transformEntriesAttributes<any>;
  [FunctionNames.mapArrayValues]: mapArrayValuesAttributes<any, any>;
  [FunctionNames.mapRecursive]: mapRecursiveAttributes<any>;
  [FunctionNames.forRecursive]: forRecursiveAttributes<any>;
  [FunctionNames.forEachRecursive]: forEachRecursiveAttributes<any>;
  [FunctionNames.forLoopRecursive]: forLoopRecursiveAttributes<any>;
  [FunctionNames.transformObject]: transformObjectAttributes;
  [FunctionNames.addValueToArrayAtIndex]: addValueToArrayAtIndexAttributes<any>;
  [FunctionNames.removeValueFromArrayAtIndex]: removeValueFromArrayAtIndexAttributes<any>;
  [FunctionNames.prependValueToArray]: prependValueToArrayAttributes<any>;
  [FunctionNames.prependObjectKeysWith]: prependObjectKeysWithAttributes<any>;
  [FunctionNames.setValueAtPathInObject]: setValueAtPathInObjectAttributes<any>;
  [FunctionNames.joinArrayElements]: joinArrayElementsAttributes<any>;
  [FunctionNames.assignProp]: assignPropAttributes<any, any>;
  [FunctionNames.setNestedValue]: setNestedValueAttributes<any>;
  [FunctionNames.setByDotNotation]: setByDotNotationAttributes<any, any>;
  [FunctionNames.addBefore]: addBeforeAttributes;
  [FunctionNames.addAfter]: addAfterAttributes;
  [FunctionNames.replaceBetween]: replaceBetweenAttributes;
  [FunctionNames.mask]: maskAttributes;
  [FunctionNames.replaceArray]: replaceArrayAttributes;
  [FunctionNames.substrReplace]: substrReplaceAttributes;
  [FunctionNames.processTemplateStrings]: processTemplateStringsAttributes;
  [FunctionNames.arrayToObject]: arrayToObjectAttributes<any>;
  [FunctionNames.collapse]: collapseAttributes<any>;
  [FunctionNames.separateKeysAndValues]: separateKeysAndValuesAttributes<any>;
  [FunctionNames.createQueryString]: createQueryStringAttributes;
  [FunctionNames.convertArrayToClassString]: convertArrayToClassStringAttributes;
  [FunctionNames.convertObjectToCssString]: convertObjectToCssStringAttributes;
  [FunctionNames.undot]: undotAttributes;
  [FunctionNames.ensureArray]: ensureArrayAttributes<any>;
  [FunctionNames.replaceDynamicTargets]: replaceDynamicTargetsAttributes<any>;
  [FunctionNames.mergeObjects]: mergeObjectsAttributes;
  [FunctionNames.deepMerge]: deepMergeAttributes;
  [FunctionNames.objectToArray]: objectToArrayAttributes<any>;
  [FunctionNames.excludeKeys]: excludeKeysAttributes<any, any>;
  [FunctionNames.resolveTemplateString]: resolveTemplateStringAttributes;
  [FunctionNames.limit]: limitAttributes;
  [FunctionNames.lower]: lowerAttributes;
  [FunctionNames.upper]: upperAttributes;
  [FunctionNames.reverse]: reverseAttributes;
  [FunctionNames.slug]: slugAttributes;
  [FunctionNames.studly]: studlyAttributes;
  [FunctionNames.title]: titleAttributes;
  [FunctionNames.swap]: swapAttributes;
  [FunctionNames.snake]: snakeAttributes;
  [FunctionNames.squish]: squishAttributes;
  [FunctionNames.headline]: headlineAttributes;
  [FunctionNames.replaceStart]: replaceStartAttributes;
  [FunctionNames.replaceEnd]: replaceEndAttributes;
  [FunctionNames.replaceFirst]: replaceFirstAttributes;
  [FunctionNames.replaceLast]: replaceLastAttributes;
  [FunctionNames.excerpt]: excerptAttributes;
  [FunctionNames.finish]: finishAttributes;
  [FunctionNames.wordWrap]: wordWrapAttributes;
  [FunctionNames.strWrap]: strWrapAttributes;
};
