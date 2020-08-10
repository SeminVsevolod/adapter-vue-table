import COLUMN_TYPE from './COLUMN_TYPE';

/**
 * Объект для описания колонки таблицы
 */
interface IColumn {
  key: string
  label: string
  type: COLUMN_TYPE
}

export default IColumn;
