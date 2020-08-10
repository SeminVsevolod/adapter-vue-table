import IColumn from './IColumn';

/**
 * Формат данных для таблицы, ожидаемый от бэкэнда
 */
interface ITableDataFromBackend {
  /**
   * Номер текущей страницы
   */
  page: number,
  
  /**
   * Номер последней страницы
   */
  lastPage: number,

  /**
   * Кол-во строк на странице
   */
  perPage: number,

  /**
   * Всего строк в таблице
   */
  total: number,

  /**
   * Строки таблицы
   */
  rows: Array<object>,

  /**
   * Колонки таблицы
   */
  columns: Array<IColumn>
}

export default ITableDataFromBackend;
