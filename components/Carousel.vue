<template>
  <div>
    <b-carousel
      class="outer-boarder"
      id="carousel-1"
      v-model="slide"
      :interval="10000"
      controls
      indicators
      fade
      background="#ababab"
      img-width="1024"
      img-height="360"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100 h-60"
            src="/login-bg.png"
            alt="pera rides welcome page"
          >
        </template>
        <h1>Welcome to the Pera Ride</h1>
        <p>This is the index page of university Bicycle Sharing Project.It's nice to have you here!</p>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide 
        img-src="/bg1.png"></b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>

    </b-carousel>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    },
    name: 'Carousel'
  }
</script>