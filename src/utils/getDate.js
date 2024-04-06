import { format } from 'date-fns';
import * as Consts from '../utils/consts'

export const getFormatDate = (date) =>
  format(date, Consts.DateFormat)