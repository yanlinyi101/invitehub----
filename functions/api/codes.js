
export async function onRequestGet(context) {
  const { results } = await context.env.DB.prepare(
    "SELECT * FROM invite_codes ORDER BY createdAt DESC"
  ).all();
  return Response.json(results);
}

export async function onRequestPost(context) {
  try {
    const { id, code, note, status, createdAt, updatedAt, addedBy } = await context.request.json();
    
    // Validate required fields
    if (!id || !code) {
      return new Response("Missing required fields", { status: 400 });
    }

    const result = await context.env.DB.prepare(
      "INSERT INTO invite_codes (id, code, note, status, createdAt, updatedAt, addedBy) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *"
    ).bind(id, code, note || "", status || "available", createdAt, updatedAt, addedBy || "Anonymous").first();

    return Response.json(result, { status: 201 });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
