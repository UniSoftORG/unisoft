// import * as CyclicFunctions from "@/utils/Functions/Base/cyclicFunctions";
// import * as Getters from "../../../packages/utils/src/getters/string";
//
// const functionsMap: any = {
//     // ...Getters,
//     ...CyclicFunctions
// };
//
// export default functionsMap;

import * as Getters from "../../../packages/utils/src/getters/string";
import {registerFunctionsFromModule} from "@/utils/Functions/DynamicFunctionLibrary";

registerFunctionsFromModule(Getters);