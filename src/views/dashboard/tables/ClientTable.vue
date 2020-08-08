<template>
  <v-container id="data-tables" tag="section">
    <v-tabs color="primary" background-color="transparent" class="px-0">
      <v-tab>Pending Review</v-tab>
      <v-tab>
        <v-badge
          color="error"
          class="drawer-badge-icon"
        >
          <template v-slot:badge>
            {{ rejectedItems.length || 0}}
          </template>
          <span>Rejected</span>
        </v-badge>
      </v-tab>
      <v-tab>Approved</v-tab>
      <v-tab-item>
        <base-material-card color="indigo" inline class="px-5 py-3 mt-0" :haveHeading="false">
          <v-row>
            <v-btn
              right
              color="primary"
              class="ml-auto"
              style="max-width: 250px;"
            >
              <v-icon class="mr-2">
                mdi-content-save
              </v-icon>
              Commit
            </v-btn>
          </v-row>
          
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
            :items="pendingItems"
            :search.sync="search"
            :sort-by="['name', 'Confidence']"
            :sort-desc="[false, true]"
            multi-sort
          >
          <template v-slot:item.Vendor="{ item }">
            <v-checkbox
              :v-model="true"
              :label="item.Vendor"
              class="mt-0"
              hide-details
            ></v-checkbox>
          </template>
          <template v-slot:item.Confidence="{ item }" >
            <div class="text-center pa-0">
              <!-- <v-avatar :color="getColor(item.Confidence)" size="50">
                <span class="white--text body-2">{{ item.Confidence }}%</span>
              </v-avatar> -->
              <v-chip
                class="ma-2 py-4 px-6"
                :color="getColor(item.Confidence)"
                text-color="white"
              >
                <span class="body-1">{{ item.Confidence }}%</span>
              </v-chip>
            </div>
          </template>
          <template v-slot:item.Category="{ item }">
            <div class="text-center">
              <v-autocomplete
                v-model="category"
                :items="categories"
                dense
                filled
                full-width
                label=""
                item-text="name"
                item-value="name"
                hide-details
              >
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content class="category-selection" v-text="data.item"></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-content class="category-selection"> 
                      <v-list-item-title v-html="data.item.name"></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </div>
          </template>
          <template v-slot:item.Location="{ item }">
            <div class="text-center">
              <v-select
                :items="locations"
                v-model="item.Location"
                solo
                hide-details
                label=""
              ></v-select>
            </div>
          </template>
          <template v-slot:item.Department="{ item }">
            <div class="text-center">
              <v-select
                :items="departments"
                v-model="item.Department"
                solo
                hide-details
                label=""
              ></v-select>
            </div>
          </template>
          <template v-slot:item.Class="{ item }">
            <div class="text-center">
              <v-select
                :items="classes"
                solo
                hide-details
                label=""
              ></v-select>
            </div>
          </template>
          <template v-slot:item.Action="{ item }">
            <div class="text-center">
              <v-btn class="mx-2" fab dark x-small color="green" @click="addItemToApproved(item, pendingItems)">
                <v-icon dark>mdi-check</v-icon>
              </v-btn>

              <v-btn class="mx-2" fab dark x-small color="red" @click="addItemToRejected(item, pendingItems)">
                <v-icon dark>mdi-send-clock-outline</v-icon>
              </v-btn>
            </div>
          </template>
          </v-data-table>
        </base-material-card>
      </v-tab-item>
      <v-tab-item>
        <base-material-card color="indigo" inline class="px-5 py-3 mt-0" :haveHeading="false">
          <v-row>
            <v-btn
              right
              color="primary"
              class="ml-auto"
              style="max-width: 250px;"
            >
              <v-icon class="mr-2">
                mdi-content-save
              </v-icon>
              Commit
            </v-btn>
          </v-row>
          
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
            :items="rejectedItems"
            :search.sync="search"
            :sort-by="['name', 'Confidence']"
            :sort-desc="[false, true]"
            multi-sort
          >
          <template v-slot:item.Vendor="{ item }">
            <v-checkbox
              :v-model="true"
              :label="item.Vendor"
              class="mt-0"
              hide-details
            ></v-checkbox>
          </template>
          <template v-slot:item.Confidence="{ item }" >
            <div class="text-center pa-0">
              <!-- <v-avatar :color="getColor(item.Confidence)" size="50">
                <span class="white--text body-2">{{ item.Confidence }}%</span>
              </v-avatar> -->
              <v-chip
                class="ma-2 py-5 px-8"
                :color="getColor(item.Confidence)"
                text-color="white"
              >
                <span class="body-1">{{ item.Confidence }}%</span>
              </v-chip>
            </div>
          </template>
          <template v-slot:item.Category="{ item }">
            <div class="text-center">
              <v-autocomplete
                v-model="category"
                :items="categories"
                dense
                filled
                full-width
                label=""
                item-text="name"
                item-value="name"
                hide-details
              >
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content class="category-selection" v-text="data.item"></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-content class="category-selection"> 
                      <v-list-item-title v-html="data.item.name"></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </div>
          </template>
          <template v-slot:item.Location="{ item }">
            <div class="text-center">
              <v-select
                :items="locations"
                v-model="item.Location"
                solo
                hide-details
                label=""
              ></v-select>
            </div>
          </template>
          <template v-slot:item.Department="{ item }">
            <div class="text-center">
              <v-select
                :items="departments"
                v-model="item.Department"
                solo
                hide-details
                label=""
              ></v-select>
            </div>
          </template>
          <template v-slot:item.Class="{ item }">
            <div class="text-center">
              <v-select
                :items="classes"
                solo
                hide-details
                label=""
              ></v-select>
            </div>
          </template>
          <template v-slot:item.Action="{ item }">
            <div class="text-center">
              <v-btn class="mx-2" fab dark x-small color="green" @click="addItemToApproved(item, rejectedItems)">
                <v-icon dark>mdi-check</v-icon>
              </v-btn>
            </div>
          </template>
          </v-data-table>
        </base-material-card>
      </v-tab-item>
      <v-tab-item>
        <base-material-card color="indigo" inline class="px-5 py-3 mt-0" :haveHeading="false">
          <v-row>
            <v-btn
              right
              color="primary"
              class="ml-auto"
              style="max-width: 250px;"
            >
              <v-icon class="mr-2">
                mdi-content-save
              </v-icon>
              Commit
            </v-btn>
          </v-row>
          
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
            :items="approvedItems"
            :search.sync="search"
            :sort-by="['name', 'Confidence']"
            :sort-desc="[false, true]"
            multi-sort
          >
          <template v-slot:item.Vendor="{ item }">
            <v-checkbox
              :v-model="true"
              :label="item.Vendor"
              class="mt-0"
              hide-details
            ></v-checkbox>
          </template>
          <template v-slot:item.Confidence="{ item }" >
            <div class="text-center pa-0">
              <!-- <v-avatar :color="getColor(item.Confidence)" size="50">
                <span class="white--text body-2">{{ item.Confidence }}%</span>
              </v-avatar> -->
              <v-chip
                class="ma-2 py-5 px-8"
                :color="getColor(item.Confidence)"
                text-color="white"
              >
                <span class="body-1">{{ item.Confidence }}%</span>
              </v-chip>
            </div>
          </template>
          <template v-slot:item.Category="{ item }">
            <div class="text-center">
              <v-autocomplete
                v-model="category"
                :items="categories"
                dense
                filled
                full-width
                label=""
                item-text="name"
                item-value="name"
                hide-details
              >
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content class="category-selection" v-text="data.item"></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-content class="category-selection"> 
                      <v-list-item-title v-html="data.item.name"></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </div>
          </template>
          <template v-slot:item.Location="{ item }">
            <div class="text-center">
              <v-select
                :items="locations"
                v-model="item.Location"
                solo
                hide-details
                label=""
              ></v-select>
            </div>
          </template>
          <template v-slot:item.Department="{ item }">
            <div class="text-center">
              <v-select
                :items="departments"
                v-model="item.Department"
                solo
                hide-details
                label=""
              ></v-select>
            </div>
          </template>
          <template v-slot:item.Class="{ item }">
            <div class="text-center">
              <v-select
                :items="classes"
                solo
                hide-details
                label=""
              ></v-select>
            </div>
          </template>
          <template v-slot:item.Action="{ item }">
            <div class="text-center">
              <v-btn class="mx-2" fab dark x-small color="red" @click="addItemToRejected(item, approvedItems)">
                <v-icon dark>mdi-send-clock-outline</v-icon>
              </v-btn>
            </div>
          </template>
          </v-data-table>
        </base-material-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import {
  CATEGORY_MOCK
} from "@/plugins/constants/category-mock"
import {
  DEPARTMENT_MOCK
} from "@/plugins/constants/department-mock"
import {
  PENDING_CLIENT_MOCK,
  REJECTED_CLIENT_MOCK,
  APPROVED_CLIENT_MOCK
} from "@/plugins/constants/client-mock"
import {
  CLASS_MOCK
} from "@/plugins/constants/class-mock"
import {
  LOCATION_MOCK
} from "@/plugins/constants/location-mock"
export default {
  name: "ClientTable",
  data: () => (
    
    {
    headers: [
      {
        text: "Date",
        value: "Date"
      },
      {
        text: "Vendor/Payee",
        value: "Vendor"
      },
      {
        text: "Confidence Level",
        value: "Confidence"
      },
      {
        text: "Amount",
        value: "Amount"
      },
      {
        text: "Description",
        value: "Description"
      },
      {
        text: "Category",
        value: "Category",
        width: "15%"
      },
      {
        text: "Department",
        value: "Department",
        width: "9%"
      },
      {
        text: "Location",
        value: "Location",
        width: "9%"
      },
      {
        text: "Class",
        value: "Class",
        width: "9%"
      },
      {
        text: "Action",
        value: "Action",
        width: "9%"
      },
      
    ],
    pendingItems: PENDING_CLIENT_MOCK,
    rejectedItems: REJECTED_CLIENT_MOCK,
    approvedItems: APPROVED_CLIENT_MOCK,
    classes: CLASS_MOCK,
    locations: LOCATION_MOCK, 
    categories: CATEGORY_MOCK,
    category: null,
    departments: DEPARTMENT_MOCK,
    search: undefined,
  }),
  methods: {
    getColor (calories) {
      if (calories > 94) return 'green'
      else if (calories > 74) return 'yellow'
      else return 'red'
    },
    addItemToApproved( item, fromSource ){
      fromSource.splice(fromSource.findIndex( sourceItem => sourceItem.id == item.id), 1);
      this.approvedItems.splice(0, 0, item);
      console.log('pending', this.pendingItems.length);
      console.log('rejected', this.rejectedItems.length);
      console.log('approved', this.approvedItems.length);
    },
    addItemToRejected( item, fromSource ){
      fromSource.splice(fromSource.findIndex( sourceItem => sourceItem.id == item.id), 1);
      this.rejectedItems.splice(0, 0, item);
      console.log('pending', this.pendingItems.length);
      console.log('rejected', this.rejectedItems.length);
      console.log('approved', this.approvedItems.length);
    }
  },
};
</script>
<style lang="sass">

th
  font-size: 12px!important
  background-color: #eee
.v-tab
  .drawer-badge-icon
    .v-badge__badge
      right: -15px!important
      top: -20px!important

</style>