
export async function onRequestPatch(context) {
  const id = context.params.id;
  
  try {
    const { status } = await context.request.json();
    const updatedAt = Date.now();

    await context.env.DB.prepare(
      "UPDATE invite_codes SET status = ?, updatedAt = ? WHERE id = ?"
    ).bind(status, updatedAt, id).run();

    return new Response("Updated", { status: 200 });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}

export async function onRequestDelete(context) {
  const id = context.params.id;
  
  try {
    await context.env.DB.prepare(
      "DELETE FROM invite_codes WHERE id = ?"
    ).bind(id).run();

    return new Response("Deleted", { status: 200 });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
