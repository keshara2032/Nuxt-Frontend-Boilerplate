<template>
<div class="back-ground">

<h1>Index Page</h1>

</div>


	
</template>

<script>

import LoginForm from '../../../components/LoginForm'
import Test from '../../../components/test'

	export default {

		components: {
			// Navbar,
			LoginForm
		},
		middleware: 'auth-user',
	
		data: () => ({

			

	
		})

	}



</script>


<style scoped>

.mini-map {
  width: 100%;
  height: 800px;
}
.star{
	background-color: #4CAF50; /* Green */
	background: red;
	color: #000;
  font-size: 4.5em;
    border-radius: 4px;
	  height: 26px; 
  width: 26px;  
} 

.custom-control {
  background: #fff;
  padding: 0 0.5em;
  border: 1px solid #aaa;
  border-radius: 0.6em;
}

</style>