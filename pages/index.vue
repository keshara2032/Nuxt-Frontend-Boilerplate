<template>
<div>


  <div>
  <b-jumbotron class="view">
    <template v-slot:header>
      <br>
      <br>
      PeraRide</template>
    <template v-slot:lead>
      <p>This is a simple hero unit, a simple jumbotron-style component 
        <br>
      for calling extra attention to
      featured content or information.</p>
    </template>


    <p>
      It uses utility classes for typography and spacing to space content out within the larger
      container.
    </p>

    <b-button variant="success">Do Something</b-button>
    <b-button variant="success">Do Something Else</b-button>

  </b-jumbotron>
</div>
<!-- 
<b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    fade
    indicators
    img-width="1024"
    img-height="480"
  >
    <b-carousel-slide
      caption="First slide"
      img-src="https://picsum.photos/1024/480/?image=10"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Second Slide"
      img-src="https://picsum.photos/1024/480/?image=12"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Third Slide"
      img-src="https://picsum.photos/1024/480/?image=22"
    ></b-carousel-slide>
  </b-carousel> -->

  <Footer />
</div>
</template>

<style scoped>


</style>

<script>
// import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'

  export default {
    components: {
      // Navbar,
      Footer,
      Carousel
    }
  }
</script>

<style  scoped>

.view {
    background-image: url('/bg-01.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    height: calc(100vh - 60px);
  }
</style>