<template>
  <v-container
    id="login"
    class="fill-height"
    tag="section"
  >
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card
          color="success"
          light
          max-width="100%"
          class="px-5 py-3"
          :haveHeading="false"
        >
          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-2 font-weight-bold mb-2">
                Login
              </h1>

              <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :href="social.href"
                class="ma-1"
                icon
                rel="noopener"
                target="_blank"
              >
                <v-icon
                  v-text="social.icon"
                />
              </v-btn>
            </div>
          </template>

          <!-- <v-card-text class="text-center">
            <div class="text-center grey--text body-1 font-weight-light">
              Or Be Classical
            </div>

            <v-text-field
              color="secondary"
              label="First Name..."
              prepend-icon="mdi-face"
              class="mt-10"
            />

            <v-text-field
              color="secondary"
              label="Email..."
              prepend-icon="mdi-email"
            />

            <v-text-field
              class="mb-8"
              color="secondary"
              label="Password..."
              prepend-icon="mdi-lock-outline"
            />

            <pages-btn
              large
              color=""
              depressed
              class="v-btn--text success--text"
            >
              Let's Go
            </pages-btn>
          </v-card-text> -->
          <amplify-authenticator v-if="!signedIn"></amplify-authenticator>
          <amplify-sign-out v-else></amplify-sign-out>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
  import { Auth } from "aws-amplify"
  import { AmplifyEventBus } from 'aws-amplify-vue';
  export default {
    name: 'PagesLogin',

    components: {
      PagesBtn: () => import('./components/Btn'),
    },

    data: () => ({
      socials: [
        {
          href: '#',
          icon: 'mdi-facebook-box',
        },
        {
          href: '#',
          icon: 'mdi-twitter',
        },
        {
          href: '#',
          icon: 'mdi-github-box',
        },
      ],
    }),
    computed: {
      signedIn: function(){
        return this.$store.state.auth.signedIn;
      }
    },
    methods: {
      async isUserSignedIn(){
        try{
          const userObj = await Auth.currentAuthenticatedUser();
          this.$store.state.auth.signedIn = true;
          this.$store.state.auth.user = userObj;
        } catch(err) {
          this.$store.state.auth.signedIn = false;
          this.$store.state.auth.user = null;
          console.log('error', err)
        }
      }
    },
    created() {
      this.isUserSignedIn();
      AmplifyEventBus.$on('authState', info => {
        if (info === 'signedIn'){
          this.isUserSignedIn();
          this.$router.push({ name: "Dashboard" });
        } else{
          this.$store.commit('auth/SET_USER', null);
          this.$store.commit('auth/SET_SIGNEDIN', false);
          this.$store.state.auth.signedIn = false;
          this.$store.state.auth.user = null;
        }
      });

    }
  }
</script>
