import { Shades } from "../../../../global";

import plain from "./plain";
import pattern_1 from "./p1";
import pattern_2 from "./p2";
import pattern_3 from "./p3";
import pattern_4 from "./p4";
import pattern_5 from "./p5";
import pattern_6 from "./p6";
import pattern_7 from "./p7";

export const p: {
  [key: string]: ({ primary, secondary }: Shades) => string;
} = {
  plain,
  pattern_1,
  pattern_2,
  pattern_3,
  pattern_4,
  pattern_5,
  pattern_6,
  pattern_7,
};
