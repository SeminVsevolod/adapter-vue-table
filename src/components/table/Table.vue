<template>
  <div class="container mx-auto px-4 sm:px-8">
    <div class="py-8">
      <div class="my-2 flex sm:flex-row flex-col">
        <div class="flex flex-row mb-1 sm:mb-0">
          <div class="relative">
            <select
              class="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                  v-for="column in columns"
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
                  v-for="column in columns"
                  :key="`row-${row_index}.col-${column.key}`"
                  class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                >
                  <div
                    v-if="column.type === TableTypes.Image"
                    class="flex items-center"
                  >
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
                    v-if="
                      column.type === TableTypes.String ||
                        column.type === TableTypes.Number
                    "
                    class="text-gray-900 whitespace-no-wrap text-left"
                  >
                    {{ row[column.key] }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>

          <div
            class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"
          >
            <span class="text-xs xs:text-sm text-gray-900">
              Показаны страницы 1-4 из 50 сущностей
            </span>
            <div class="inline-flex mt-2 xs:mt-0">
              <button
                class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
              >
                Предыдущая
              </button>
              <button
                class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
              >
                Следующая
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TableTypes from "@/components/table/TableTypes";

export default Vue.extend({
  name: "Table",

  props: {
    /**
     * Строки таблицы, данные
     */
    rows: {
      type: Array,
      required: true
    },

    /**
     * Столбцы таблицы с описанием типов
     */
    columns: {
      type: Array,
      required: true
    }
  },

  data: () => {
    return {
      TableTypes,

      /**
       * Поле поиска по таблице
       */
      searchField: ""
    };
  },

  computed: {
    /**
     * Отфильтрованные строки таблицы
     */
    filteredRows() {
      if (!(this.searchField as string).trim().length) {
        return this.rows;
      }

      return this.rows.filter((row: any) =>
        Object.keys(row).some(key =>
          (row[key as string] as string).toLowerCase().includes(this.searchField.trim().toLowerCase())
        )
      );
    }
  }
});
</script>

<style scoped lang="scss"></style>
