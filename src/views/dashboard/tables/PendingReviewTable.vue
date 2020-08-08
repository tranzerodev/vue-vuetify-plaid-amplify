<template>
  <v-container id="data-tables" tag="section">
    <v-tabs color="primary" background-color="transparent">
      <v-tab>Pending Review</v-tab>
      <v-tab>Approved</v-tab>
      <v-tab-item>
        <base-material-card color="indigo" icon="mdi-account" inline class="px-5 py-3 mb-0">
          <template v-slot:after-heading>
            <div class="display-2 font-weight-light">Pending Review</div>
          </template>

          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            class="ml-auto"
            label="Search"
            hide-details
            single-line
            style="max-width: 250px;"
          />

          <v-divider class="mt-3" />

          <v-data-table
            :headers="headers"
            :items="items"
            :search.sync="search"
            :sort-by="['name', 'office']"
            :sort-desc="[false, true]"
            multi-sort
          />
        </base-material-card>
      </v-tab-item>
      <v-tab-item>
        <base-material-card color="indigo" icon="mdi-account" inline class="px-5 py-3 mb-0">
          <template v-slot:after-heading>
            <div class="display-2 font-weight-light">Approved</div>
          </template>

          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            class="ml-auto"
            label="Search"
            hide-details
            single-line
            style="max-width: 250px;"
          />

          <v-divider class="mt-3" />

          <v-data-table
            :headers="headers"
            :items="items"
            :search.sync="search"
            :sort-by="['name', 'office']"
            :sort-desc="[false, true]"
            multi-sort
          />
        </base-material-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
export default {
  name: "PendingReviewTable",

  data: () => ({
    headers: [
      {
        text: "Name",
        value: "name"
      },
      {
        text: "Position",
        value: "position"
      },
      {
        text: "Office",
        value: "office"
      },
      {
        text: "Age",
        value: "age"
      },
      {
        text: "Date",
        value: "date"
      },
      {
        sortable: false,
        text: "Actions",
        value: "actions"
      }
    ],
    items: [
      {
        name: "Airi Satou",
        position: "Accountant",
        office: "Tokyo",
        age: 33,
        date: "2008/11/28"
      },
      {
        name: "Angelica Ramos",
        position: "Chief Executive Officer (CEO)",
        office: "London",
        age: 47,
        date: "2009/10/09"
      },
      {
        name: "Ashton Cox",
        position: "Junior Technical Author",
        office: "San Francisco",
        age: 66,
        date: "2009/01/12"
      },
      {
        name: "Bradley Greer",
        position: "Software Engineer",
        office: "London",
        age: 41,
        date: "2012/10/13"
      },
      {
        name: "Brenden Wagner",
        position: "Software Engineer",
        office: "San Francisco",
        age: 28,
        date: "2011/06/07"
      }
    ],
    search: undefined
  })
};
</script>
