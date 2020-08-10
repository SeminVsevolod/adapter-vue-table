<template>
  <div class="home bg-gray-200 min-h-screen">
    <h2 class="text-3xl">Товары</h2>
    <Table :rows="rows" :columns="columns" :url="url" />
  </div>
</template>

<script>
// @ is an alias to /src
import Table from '@/components/table/Table.vue';
import COLUMN_TYPE from '@/components/table/COLUMN_TYPE';

export default {
  name: 'Home',

  components: {
    Table
  },

  data() {
    return {
      url: 'http://localhost:3000/products',

      rows: [
        {
          name: 'Манго',
          price: '200 руб',
          totalCell: '73'
        },
        {
          name: 'Яблоко',
          price: '75 руб',
          totalCell: '865'
        },
        {
          name: 'Апельсины',
          price: '60 руб',
          totalCell: '341'
        }
      ],

      columns: [
        {
          type: COLUMN_TYPE.STRING,
          key: 'name',
          label: 'Название товара'
        },
        {
          type: COLUMN_TYPE.NUMBER,
          key: 'price',
          label: 'Цена'
        },
        {
          type: COLUMN_TYPE.NUMBER,
          key: 'totalCell',
          label: 'Продаж за месяц'
        }
      ]
    };
  }
};
</script>
