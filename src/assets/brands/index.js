import IeltsMark from './IeltsMark';
import ToeflMark from './ToeflMark';
import CambridgeMark from './CambridgeMark';
import DuolingoMark from './DuolingoMark';

/** brand key (course.brand) -> mark component */
export const BRAND_MARKS = {
  ielts: IeltsMark,
  toefl: ToeflMark,
  cambridge: CambridgeMark,
  duolingo: DuolingoMark,
};

export { IeltsMark, ToeflMark, CambridgeMark, DuolingoMark };
