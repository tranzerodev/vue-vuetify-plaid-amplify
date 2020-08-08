<template>
  <v-container id="lock" class="fill-height" tag="section">
    <v-row justify="center">
      <v-slide-y-transition appear>
        <v-card class="mt-6 mt-md-0" light max-width="100%" width="250">
          <v-card-text class="text-center">
            <v-avatar class="mt-n12 mb-6 elevation-12" color="grey" size="88">
              <v-img
                :src="require('@/assets/avatar.png')"
              />
            </v-avatar>

            <div class="display-2 font-weight-light mb-3 text--darken-2 grey--text">Tania Andrew</div>
            <plaid-link
              env="sandbox"
              publicKey="e8109e8a9d5ed7e5451fab3f56d652"
              clientName="Test App"
              product="transactions"
              v-bind="{ onSuccess }"
            >Open Plaid Link</plaid-link>
          </v-card-text>
        </v-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
import PlaidLink from "vue-plaid-link";
export default {
  name: "PlaidLinkPage",
  components: {
    PagesBtn: () => import("./components/Btn"),
    PlaidLink
  },
  methods: {
    onSuccess(token) {
      console.log('token', token);
    }
  }
};
</script>
