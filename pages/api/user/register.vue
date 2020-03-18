<template>
<div class="back-ground">
<!-- navigation bar of the page -->
	<!-- <Navbar /> -->


<!-- rest of the page with registration form -->
	<RegistrationForm />
	<br>

<!-- bottum footage of the page -->
	<Footer />

</div>
</template>

<style scoped>

</style>

<script>

// import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import RegistrationForm from '../../../components/RegistrationForm'


export default {
	components: {
		// Navbar,
		Footer,
		RegistrationForm
	},
	middleware: 'guest'
}

</script>
