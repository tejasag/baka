<script lang="ts">
  import { invalidate } from "$app/navigation";
  import type { PageData, ActionData } from "./$types";

  /** @type {import('./$types').PageData}*/
  export let data: PageData;

  /** @type {import('./$types').ActionData} */
  export let form: ActionData;

  let cat = "";

  const submit = () => {
    invalidate("app:categories");
  };

  const deleteCat = async (index) => {
    const cat = data.categories[index];
    if (
      prompt(
        "Are you sure you want to delete " +
          cat.name +
          " and all it's cards? type 'yes' to confirm"
      ) === "yes"
    ) {
      await fetch(`?/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          name: cat.name,
        }),
      });

      invalidate("app:categories");
    } else alert("Cancelled");
  };
</script>

<div class="form">
  <h1>Create category</h1>

  <form method="POST" action="?/create">
    <label>
      Name
      <input bind:value={cat} name="name" />
    </label>
    <button on:click={submit}>Create</button>
  </form>
  {#if form?.success}
    Done! created {cat}
  {/if}
</div>

<hr />

<div class="cards">
  <h1>Categories</h1>
  {#each data.categories as category, index}
    <div>
      <a href={`/${category.name}`}>{category.name}</a>
      <button on:click={() => deleteCat(index)}>delete</button>
    </div>
  {/each}
</div>
