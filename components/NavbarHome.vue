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
	          	<b-button variant="outline-info" @click="$auth.logout()">Logout</b-button>
	          </b-navbar-nav>   
	        </b-collapse>
	    </b-navbar>
	</div>
</template>

<script>
	export default {
		name : 'NavbarHome'
	}
</script>