<template>
  <v-container
    id="register"
    class="fill-height"
    tag="section"
  >
    <v-row justify="center">
      <v-col cols="12">
        <v-slide-y-transition appear>
          <v-card
            class="pa-3 pa-md-5 mx-auto"
            light
          >
            <pages-heading class="text-center display-3">
              Register
            </pages-heading>

            <v-row>

              <v-col
                cols="12"
                md="12"
              >
                <amplify-authenticator v-if="!signedIn"></amplify-authenticator>
                <amplify-sign-out v-else></amplify-sign-out>
                <!-- <div class="text-center">
                  <v-btn
                    v-for="(social, i) in socials"
                    :key="i"
                    :color="social.iconColor"
                    class="my-2 mr-1"
                    dark
                    depressed
                    fab
                    small
                  >
                    <v-icon v-text="social.icon" />
                  </v-btn>

                  <div class="my-2" />

                  <div class="text-center grey--text body-1 font-weight-light">
                    Or Be Classical
                  </div>

                  <v-text-field
                    color="secondary"
                    label="First Name..."
                    prepend-icon="mdi-face"
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

                  <v-checkbox
                    :input-value="true"
                    color="secondary"
                  >
                    <template v-slot:label>
                      <span class="text-no-wrap">I agree to the&nbsp;</span>

                      <a
                        class="secondary--text ml-6 ml-sm-0"
                        href="#"
                      >
                        terms and conditions
                      </a>.
                    </template>
                  </v-checkbox>

                  <pages-btn color="success">
                    Get Started
                  </pages-btn>
                </div> -->
              </v-col>
            </v-row>
          </v-card>
        </v-slide-y-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { Auth } from "aws-amplify"
  import { AmplifyEventBus } from 'aws-amplify-vue';
  export default {
    name: 'PagesRegister',

    components: {
      PagesBtn: () => import('./components/Btn'),
      PagesHeading: () => import('./components/Heading'),
    },

    data: () => ({
      sections: [
        {
          icon: 'mdi-chart-timeline-variant',
          iconColor: 'primary',
          title: 'Marketing',
          text: `We've created the marketing campaign of the website. It was a very interesting collaboration.`,
        },
        {
          icon: 'mdi-code-tags',
          iconColor: 'secondary',
          title: 'Fully Coded in HTML5',
          text: `We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub.`,
        },
        {
          icon: 'mdi-account-multiple',
          iconColor: 'cyan',
          title: 'Built Audience',
          text: 'There is also a Fully Customizable CMS Admin Dashboard for this product.',
        },
      ],
      socials: [
        {
          href: '#',
          icon: 'mdi-twitter',
          iconColor: '#1DA1F2',
        },
        {
          href: '#',
          icon: 'mdi-dribbble',
          iconColor: '#ea4c89',
        },
        {
          href: '#',
          icon: 'mdi-facebook',
          iconColor: '#3B5998',
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
          console.log('user', userObj);
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
        console.log('info', info);
        if (info === 'signedIn'){
          this.isUserSignedIn();
        } else{
          this.$store.commit('auth/SET_USER', null);
          this.$store.commit('auth/SET_SIGNEDIN', false);
          console.log('falsed is called');
          this.$store.state.auth.signedIn = false;
          this.$store.state.auth.user = null;
        }
      });

    }
  }
</script>

<style lang="sass">
  #register
    .v-list-item__subtitle
      -webkic-line-clamp: initial
      -webkit-box-orient: initial
</style>
