<template>
  <div class="container mx-auto px-4 sm:px-8">
    <div class="py-8">
      <div class="my-2 flex sm:flex-row flex-col">
        <div class="flex flex-row mb-1 sm:mb-0">
          <div class="relative">
            <select
              class="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              @change="changePerPage($event.target.value)"
              :value="perPage"
              title="По сколько строк отображать за раз"
            >
              <option>5</option>
              <option>10</option>
              <option>20</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="block relative">
          <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
            <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
              <path
                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
              ></path>
            </svg>
          </span>
          <input
            v-model="searchField"
            placeholder="Поиск по таблице"
            class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
          />
        </div>
      </div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  v-for="column in localColumns"
                  :key="column.key"
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {{ column.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, row_index) in filteredRows" :key="row_index">
                <!-- Изображение -->
                <td
                  v-for="column in localColumns"
                  :key="`row-${row_index}.col-${column.key}`"
                  class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                >
                  <div v-if="column.type === TableTypes.Image" class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                      <img
                        class="w-full h-full rounded-full"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                        alt=""
                      />
                    </div>
                  </div>

                  <!-- Строка или Число -->
                  <p
                    v-if="column.type === TableTypes.String || column.type === TableTypes.Number"
                    class="text-gray-900 whitespace-no-wrap text-left"
                  >
                    {{ row[column.key] }}
                  </p>
                </td>
              </tr>

              <!-- Если под параметры поиска ничего не подошло -->
              <tr v-if="filteredRows.length === 0 && searchField.length">
                <td
                  :colspan="localColumns.length"
                  class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                >
                  Строк по вашему запросу не найдено. Попробуйте изменить параметры поиска
                </td>
              </tr>
            </tbody>
          </table>

          <div
            class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"
          >
            <span class="text-xs xs:text-sm text-gray-900">
              Показаны строки {{ startRowNumber }} - {{ endRowNumber }} из
              {{ total }}
            </span>
            <div class="inline-flex mt-2 xs:mt-0">
              <button
                type="button"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium focus:z-10 focus:outline-none active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                aria-label="Previous"
                :class="[
                  page === 1
                    ? 'text-gray-300 hover:text-gray-300 cursor-not-allowed'
                    : 'text-gray-500 hover:text-gray-400'
                ]"
                :disabled="page == '1'"
                @click="changePage(--page)"
              >
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <button
                v-for="p in lastPage"
                :key="p"
                class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                :class="[p === page ? 'font-bold' : 'font-normal']"
                type="button"
                @click="changePage(p)"
              >
                {{ p }}
              </button>

              <button
                type="button"
                class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                aria-label="Next"
                :class="[
                  page === lastPage
                    ? 'text-gray-300 hover:text-gray-300 cursor-not-allowed'
                    : 'text-gray-500 hover:text-gray-400'
                ]"
                :disabled="page === lastPage"
                @click="changePage(++page)"
              >
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TableTypes from '@/components/table/TableTypes';
import axios from 'axios';

@Component
export default class Table extends Vue {
  /**
   * Строки таблицы, данные (входной параметр)
   */
  @Prop({ type: Array, default: [] })
  readonly rows!: Array<object>;

  /**
   * Столбцы таблицы с описанием типов (входной параметр)
   */
  @Prop({ type: Array, default: [] })
  readonly columns!: Array<object>;

  /**
   * URL для получения данных
   */
  @Prop({
    type: String,
    default: ''
  })
  readonly url!: string;

  get TableTypes() {
    return TableTypes;
  }

  /**
   * Строки таблицы, данные (состояние комонента)
   */
  private localRows: Array<object> = [];

  /**
   * Столбцы таблицы с описанием типов (состояние комонента)
   */
  private localColumns: Array<object> = [];

  /**
   * Поле поиска по таблице
   */
  private searchField = '';

  /**
   * Текущая страница
   */
  private page = 1;

  /**
   * По сколько страниц запрашивать с бэкэнда
   */

  private perPage = 10;

  /**
   * Последняя страница
   */
  private lastPage = 1;

  /**
   * Всего строк
   */
  private total = 1;

  /**
   * Если есть url, то получать row и column из него
   */
  mounted() {
    if (this.rows) {
      this.localRows = this.rows.slice();
    }
    if (this.columns) {
      this.localColumns = this.columns.slice();
    }
    if (this.url) {
      this.getRowsAndColumnsFromURL(this.url);
    }
  }

  /**
   * Номер первой показываемой строки
   */
  get startRowNumber() {
    return this.perPage * (this.page - 1) + 1;
  }

  /**
   * Номер последней показываемой строки
   */
  get endRowNumber() {
    return Math.min(this.perPage * this.page, this.total);
  }

  /**
   * Отфильтрованные строки таблицы
   */
  get filteredRows() {
    if (!(this.searchField as string).trim().length) {
      return this.localRows;
    }

    return this.localRows.filter((row: any) =>
      Object.keys(row).some(key =>
        (row[key as string] as string).toLowerCase().includes(this.searchField.trim().toLowerCase())
      )
    );
  }

  /**
   * Получить rows и columns из url
   * @param url
   */
  public getRowsAndColumnsFromURL(url: string): void {
    axios
      .get(url, {
        params: {
          page: this.page,
          perPage: this.perPage
        }
      })
      .then(response => {
        this.lastPage = response.data.lastPage;
        this.perPage = response.data.perPage;
        this.page = response.data.page;
        this.total = response.data.total;
        this.localRows = response.data.rows;
        this.localColumns = response.data.columns;
      });
  }

  /**
   * Сменить страницу
   * @param page - страница
   */
  public changePage(page: number): void {
    this.page = page;
    this.getRowsAndColumnsFromURL(this.url);
  }

  /**
   * Изменить кол-во запрашиваемых страниц
   * @param perPage - кол-во запрашиваемых страниц
   */
  public changePerPage(perPage: number): void {
    this.perPage = perPage;
    this.page = 1;
    this.getRowsAndColumnsFromURL(this.url);
  }
}
</script>

<style scoped lang="scss"></style>
