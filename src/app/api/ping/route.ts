export async function GET() {
  try {
    const res = await fetch("https://www.google.com/favicon.ico", { method: "HEAD" });
    return new Response(JSON.stringify({ online: res.ok }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ online: false }), { status: 200 });
  }
}
