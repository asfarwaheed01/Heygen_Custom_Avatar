const HEYGEN_API_KEY = process.env.HEYGENAPIKEY;

export async function POST() {
  try {
    if (!HEYGEN_API_KEY) {
      throw new Error("API key is missing from .env");
    }

    const res = await fetch(
      "https://api.heygen.com/v1/streaming.create_token",
      {
        method: "POST",
        headers: {
          "x-api-key": HEYGEN_API_KEY,
        },
      }
    );
    const data = await res.json();

    return new Response(data.data.token, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://main.dal9auz5q4mbe.amplifyapp.com/', 
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
      },
    });
  } catch (error) {
    console.error("Error retrieving access token:", error);

    return new Response("Failed to retrieve access token", {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': 'https://main.dal9auz5q4mbe.amplifyapp.com/', 
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
      },
    });
  }
}
