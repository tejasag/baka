<script lang="ts">
  export let question: string;
  export let answer: string;

  let flipped = false;
  let data = question;

  const flip = () => {
    flipped = !flipped;
    data = flipped ? answer : question;
  };
</script>

<!-- <div on:click={flip} class="card">
  <div class="inner"> -->
<!-- <div animate:flip class="card">
  {data}
</div> -->

<!-- </div>
</div> -->
<style>
  .card {
    text-align: center;
    padding: 1rem;
    width: 50vw;
    margin: 3rem;
    perspective: 1000px;
    border-radius: 20px;
    background: #ffffff;
    box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
  }

  .inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .card:hover .inner {
    transform: rotateY(180deg);
  }
</style>
