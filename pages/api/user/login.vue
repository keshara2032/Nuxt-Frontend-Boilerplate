<template>
<div>
<!--     navigation bar of the page
    <Navbar /> -->

  <!-- rest of the page with registration form -->
    <LoginForm />

  <!-- bottum footage of the page -->
    <Footer />  
</div>
</template>

<script>
// import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import LoginForm from '../../../components/LoginForm'

export default {
  components: {
    // Navbar,
    Footer,
    LoginForm
  },
  middleware: 'guest'
}
</script>