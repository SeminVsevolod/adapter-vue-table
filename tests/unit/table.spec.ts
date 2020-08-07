import { shallowMount } from "@vue/test-utils";
import Table from "@/components/table/Table.vue";
import TableTypes from "@/components/table/TableTypes";

/**
 * Задерживает выполнение программы на время
 * @param ms - задержка в миллисекундах
 * @param val - возвращаемое значение после задержки (необзательно)
 * @example await delay(1000); - ожидает 1 секунду
 */
async function delay(ms: number, val?: any) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(val);
    }, ms);
  });
}

describe("Table.vue", () => {
  
  /**
   * Строки таблицы
   */
  const rows = [
    {
      name: "John", age: "30"
    },
    {
      name: "Alice", age: "25"
    }
  ];

  /**
   * Колонки таблицы
   */
  const columns = [
    {
      key: "name",
      label: "Имя",
      type: TableTypes.String,
    },
    {
      key: "age",
      label: "Возраст",
      type: TableTypes.String,
    }
  ];

  /**
   * Монтируем компонент и получаем wrapper
   */
  const wrapper = shallowMount(Table, {
    propsData: { rows, columns },

  });

  it("отображает шапку таблицы", () => {
    expect(wrapper.html()).toMatch('<th');
    expect(wrapper.html()).toMatch('</th>');
  });

  it("отображает тело таблицы", () => {
    expect(wrapper.html()).toMatch('<tbody');
    expect(wrapper.html()).toMatch('</tbody>');
  });

  it("отображает строки, переданные в rows", () => {
    expect(wrapper.text()).toMatch('John');
    expect(wrapper.text()).toMatch('Alice');
    expect(wrapper.text()).toMatch('30');
    expect(wrapper.text()).toMatch('25');
  });

  it("отображает имена колонок, переданные в columns", () => {
    expect(wrapper.text()).toMatch('Имя');
    expect(wrapper.text()).toMatch('Возраст');
  });

  it("фильтрует строки таблицы по полю searchField", async () => {
    wrapper.setData({ searchField: 'John' });
    await delay(100);
    expect(wrapper.text()).toMatch('John');
    expect(wrapper.text()).toMatch('30');
    expect(wrapper.text()).not.toMatch('Alice');
    expect(wrapper.text()).not.toMatch('25');

    wrapper.setData({ searchField: 'Alice' });
    await delay(100);
    expect(wrapper.text()).not.toMatch('John');
    expect(wrapper.text()).not.toMatch('30');
    expect(wrapper.text()).toMatch('Alice');
    expect(wrapper.text()).toMatch('25');

    wrapper.setData({ searchField: 'Matt' });
    await delay(100);
    expect(wrapper.text()).not.toMatch('John');
    expect(wrapper.text()).not.toMatch('30');
    expect(wrapper.text()).not.toMatch('Alice');
    expect(wrapper.text()).not.toMatch('25');

    wrapper.setData({ searchField: '' });
  });
});
