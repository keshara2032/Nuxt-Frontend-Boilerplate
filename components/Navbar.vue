<template>
	<div>
		<b-navbar toggleable="sm" type="light" class="dark-background">
			<nuxt-link to="/">
	        <b-navbar-brand>
	          <img src="../static/icon.png" height="80" width="80" alt="University of Peradeniya">
	        </b-navbar-brand>
	        </nuxt-link>
	    	
	        <b-navbar-brand class="mb-0">
	          <h1>Pera Rides</h1>
	        </b-navbar-brand>

	        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

	        <b-collapse id="nav-collapse" is-nav>
	          <!-- Right aligned nav items -->
	          <b-navbar-nav class="ml-auto">
	          <h5>
	              <b-nav-item-dropdown>
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
	</div>
</template>

<script>
	export default {
		name : 'Navbar'
	}
</script>