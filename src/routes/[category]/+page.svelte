<script lang="ts">
  import { invalidate } from "$app/navigation";
  import type { PageData, ActionData } from "./$types";

  /** @type {import('./$types').PageData}*/
  export let data: PageData;

  const submit = () => {
    invalidate("app:cards");
  };

  function shuffle<T>(array: T[]): T[] {
    let ar = [...array];
    for (let i = ar.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [ar[i], ar[j]] = [ar[j], ar[i]];
    }
    return ar;
  }

  type Card = {
    q: string;
    a: string;
  };

  let cards: Card[] = shuffle(
    data.props.cards.map((x: any) => ({
      q: x.question,
      a: x.answer,
    }))
  );

  console.log(cards);

  let curr = 0;
  const next = () => ((flipped = false), (curr = (curr + 1) % cards.length));
  const back = () => {
    curr = (curr - 1) % cards.length;
    flipped = false;
    if (curr < 0) curr = cards.length - 1;
  };

  // const flip = () => {
  //   const card = document.querySelector(".card");
  //   if (card) {
  //     card.classList.toggle("flipped");
  //     card.innerHTML = card?.classList.contains("flipped")
  //       ? cards[curr].a
  //       : cards[curr].q;
  //   }
  // };

  const flip = () => (flipped = !flipped);

  let flipped = false;
  $: text = cards[curr][flipped ? "a" : "q"];
</script>

Create card

<form method="POST">
  <label>
    Name
    <input name="name" />
  </label>
  <label>
    Content
    <input name="content" />
  </label>
  <label>
    Category
    <input name="category" value={data.props.category.name} readonly />
  </label>
  <button on:click={submit}>Create</button>
</form>

<hr />

<div on:click={flip} class="card">
  {flipped} : {text}
</div>

<button on:click={back}>back</button>
{curr + 1}/{cards.length}
<button on:click={next}>next</button>

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

  .flipped {
    background: #1d1d1d;
  }
</style>
