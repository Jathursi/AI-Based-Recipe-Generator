export async function POST(req) {
  try {
    const { ingredients } = await req.json();
    
    const response = await fetch("http://127.0.0.1:5000/generate_recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients }),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch recipe" }), { status: 500 });
  }
}
