import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import prisma from "$lib/prisma";

export const load: PageLoad = (async ({ params, depends }) => {
  let category = await prisma.category.findUnique({
    where: { name: params.category },
  });
  // if category is not found, return 404
  if (!category) {
    return error(404, "Category not found");
  }

  let cards = await prisma.card.findMany({
    where: { categoryName: category.name },
  });

  depends("app:cards");
  return {
    props: {
      category,
      cards,
    },
  };
}) satisfies PageLoad;

/** @type {import('./$types').Actions} */
export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();

    await prisma.card.create({
      data: {
        question: data.get("name"),
        answer: data.get("content"),
        category: {
          connect: {
            name: data.get("category"),
          },
        },
      },
    });

    return { success: true };
  },

  delete: async ({ request, params }) => {
    const data = await request.formData();
    await prisma.card.delete({
      where: {
        id: data.get("id"),
      },
    });
    return { success: true };
  },
};
