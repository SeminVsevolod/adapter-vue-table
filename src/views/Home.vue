<template>
  <div class="home">
    <h2 class="text-3xl">Товары</h2>
    <Table :rows="rows" :columns="columns" />
  </div>
</template>

<script>
// @ is an alias to /src
import Table from "@/components/table/Table.vue";
import TableTypes from "@/components/table/TableTypes";

export default {
  name: "Home",

  components: {
    Table
  },

  data() {
    return {
      rows: [
        {
          name: "Манго",
          price: "200 руб",
          totalCell: "73"
        },
        {
          name: "Яблоко",
          price: "75 руб",
          totalCell: "865"
        },
        {
          name: "Апельсины",
          price: "60 руб",
          totalCell: "341"
        }
      ],

      columns: [
        {
          type: TableTypes.String,
          key: "name",
          label: "Название товара"
        },
        {
          type: TableTypes.Number,
          key: "price",
          label: "Цена"
        },
        {
          type: TableTypes.Number,
          key: "totalCell",
          label: "Продаж за месяц"
        }
      ]
    };
  }
};
</script>
