<template>
  <v-app>

        <Snackbar></Snackbar>

<div class="view">

    <div v-if="$auth.loggedIn">

     <!-- Navbar for Admins -->
     <div v-if="$auth.user.role=='admin'">

        <b-navbar  >
          <b-navbar-brand>
                  <nuxt-link to="/">

            <img src="/icon.png" height="75" width="125" alt="University of Peradeniya" href="/" style="border-radius:6px;">
                    </nuxt-link>

          </b-navbar-brand>
        
          <b-navbar-brand class="mb-0">
          </b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">


            <b-nav-item-dropdown  right>
                       <template v-slot:button-content>
                        <strong><b-icon icon="shield-shaded" aria-hidden="true"></b-icon> Admin</strong>
                      </template>


              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>

            </b-nav-item-dropdown>

            <b-nav-item-dropdown right >

                  <!-- Using 'button-content' slot -->
                      <template v-slot:button-content>
                        <strong><b-icon icon="people-fill" aria-hidden="true"></b-icon> Account</strong>
                      </template>


                  <!-- link to the station map  -->
                  <nuxt-link to="/api/user/">
                        <b-dropdown-item-button href="" variant="info" >
                          <b-icon icon="geo" aria-hidden="true"></b-icon>
                          Station Map
                        </b-dropdown-item-button>
                    </nuxt-link>


                  <!-- link to the station management page  -->
                  <nuxt-link to="/admin/station">
                        <b-dropdown-item-button href="" variant="info" >
                          <b-icon icon="gear-fill" aria-hidden="true"></b-icon>
                          Station Management
                        </b-dropdown-item-button>
                    </nuxt-link>

                  <!-- link to the Dock management  -->
                  <nuxt-link to="/admin/dock">
                        <b-dropdown-item-button href="" variant="info">
                          <b-icon icon="gear-wide" aria-hidden="true"></b-icon>
                          Dock Management
                        </b-dropdown-item-button>
                    </nuxt-link>

              <!-- link to the Bike management  -->
                  <nuxt-link to="/admin/bike">
                        <b-dropdown-item-button href="" variant="info">
                          <b-icon icon="gear-wide-connected" aria-hidden="true"></b-icon>
                          Bike Management
                        </b-dropdown-item-button>
                    </nuxt-link>


                  <!-- link to the User management  -->
                   <nuxt-link to="/admin/user">
                        <b-dropdown-item-button href="" variant="info" >
                          <b-icon icon="person-fill" aria-hidden="true"></b-icon>
                          User Management
                        </b-dropdown-item-button>
                    </nuxt-link>

                      <b-dropdown-divider></b-dropdown-divider>

                  <!-- link to the Logout  -->
                      <nuxt-link to="">
                        <b-dropdown-item-button href="" variant="info" @click="$auth.logout()">
                          <b-icon icon="alert-octagon-fill" aria-hidden="true"></b-icon>
                          Logout
                        </b-dropdown-item-button>
                    </nuxt-link>



                  </b-nav-item-dropdown>


            </b-navbar-nav>   
          </b-collapse>
      </b-navbar>
       <nuxt />


     </div> 
     <!-- Navbar for Users -->
    <div v-else> 

      <b-navbar toggleable="sm" type="light" class="dark-background">
          <b-navbar-brand>
            <img src="/icon.png" height="60" width="60" alt="University of Peradeniya">
          </b-navbar-brand>
        
          <b-navbar-brand class="mb-0">
            <h2>PeraRide</h2>
          </b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <div>
            <b-nav-item-dropdown right >
                  <!-- Using 'button-content' slot -->
                      <template v-slot:button-content>
                        <strong><b-icon icon="people-fill" aria-hidden="true"></b-icon> Account</strong>
                      </template>
                  <!-- link to the station management page  -->
                  <nuxt-link to="/api/user/">
                        <b-dropdown-item-button href="" variant="info" >
                          <b-icon icon="tools" aria-hidden="true"></b-icon>
                          Stations
                        </b-dropdown-item-button>
                    </nuxt-link>

                  <!-- link to the Bike management  -->
                  <nuxt-link to="">
                        <b-dropdown-item-button href="" variant="info">
                          <b-icon icon="tools" aria-hidden="true"></b-icon>
                          History
                        </b-dropdown-item-button>
                    </nuxt-link>


                  <!-- link to the User management  -->
                   <nuxt-link to="">
                        <b-dropdown-item-button href="" variant="info" >
                          <b-icon icon="tools" aria-hidden="true"></b-icon>
                          User Settings
                        </b-dropdown-item-button>
                    </nuxt-link>

                      <b-dropdown-divider></b-dropdown-divider>

                  <!-- link to the Logout  -->
                      <nuxt-link to="">
                        <b-dropdown-item-button href="" variant="info" @click="$auth.logout()">
                          <b-icon icon="tools" aria-hidden="true"></b-icon>
                          Logout
                        </b-dropdown-item-button>
                    </nuxt-link>



                  </b-nav-item-dropdown>

                </div>
            </b-navbar-nav>   


          </b-collapse>
      </b-navbar>
       <nuxt />

     </div> 

    </div>
    <div v-else>
      <b-navbar toggleable="sm" type="light" class="dark-background">
        <nuxt-link to="/">
            <b-navbar-brand>
              <img src="/icon.png" height="60" width="60" alt="University of Peradeniya">
            </b-navbar-brand>
            </nuxt-link>
          
            <b-navbar-brand class="mb-0">
            <h2>PeraRide</h2>
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
              <!-- Right aligned nav items -->
              <b-navbar-nav class="ml-auto">
              <h5>
            <b-nav-item-dropdown right >
                  <!-- Using 'button-content' slot -->
                      <template v-slot:button-content>
                        <strong><b-icon icon="people-fill" aria-hidden="true"></b-icon> Account</strong>
                      </template>
                  <!-- link to the login form  -->
                      <nuxt-link to="/api/user/login">
                        <b-dropdown-item-button variant="info">  
                          <b-icon icon="house" aria-hidden="true"></b-icon>
                            Login
                        </b-dropdown-item-button>
                      </nuxt-link>

                      <b-dropdown-divider></b-dropdown-divider>
                  <!-- link to the registration form -->
                      <nuxt-link to="/api/user/register">
                        <b-dropdown-item-button href="" variant="info">
                          <b-icon icon="tools" aria-hidden="true"></b-icon>
                          Register
                        </b-dropdown-item-button>
                    </nuxt-link>
                  </b-nav-item-dropdown>
                </h5>
              </b-navbar-nav>   
            </b-collapse>
        </b-navbar>
      <nuxt />
    </div>

</div>

<Footer />

  </v-app>
</template>


<script>
import Snackbar from '~/components/Snackbar.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: { Snackbar },
}
</script>



<style>

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: #fff;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}


.view {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    height: calc(100vh - 60px);
  }


.back-ground {
  color: #000;
  background: #fff;
  /*background: linear-gradient(30deg,#00bcd4,#060c21,#00bcd4);*/

}

/*.outer-boarder {
  box-shadow: 0px 0px 3px 2px #060c21;
  background: linear-gradient(560deg,#00bcd4,#060c21,#00bcd4);
  /*89ff00
}*/

.inner-boarder {
  box-shadow: 0px 0px 12px 1px #27ae60;
  border-radius: 15px;
  /*background: linear-gradient(600deg,#00bcd4,#060c21,#00bcd4);*/
}

.font-white {
  color: #000;
}

.dark-background {
  background-color: #fff;
  
}
</style>