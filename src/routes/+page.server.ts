import type { PageServerLoad } from "./$types";
import prisma from "$lib/prisma";

/** @type {import('./$types').PageServerLoad} */
export const load = (async ({ params, depends }) => {
  const categories = await prisma.category.findMany();

  depends("app:categories");
  return {
    categories,
  };
}) satisfies PageServerLoad;

/** @type {import('./$types').Actions} */
export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    await prisma.category.create({
      data: {
        name: data.get("name"),
      },
    });
    return { success: true };
  },

  delete: async ({ request, params }) => {
    const data = await request.formData();
    await prisma.card.deleteMany({
      where: {
        categoryName: data.get("name"),
      },
    });
    await prisma.category.delete({
      where: {
        name: data.get("name"),
      },
    });
    return { success: true };
  },
};
