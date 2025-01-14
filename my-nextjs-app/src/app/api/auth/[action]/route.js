import axios from "axios";

export async function POST(req, { params }) {
  const { action } = await params;
  if (action == "login" || action == "signup") {
    try {
      const backendUrl = `http://localhost:8080/v1/auth/${action}`;
      const response = await axios({
        url: backendUrl,
        method: "POST",
        headers: req.headers,
        data: await req.json(), // Parse the request body
      });
      return new Response(JSON.stringify(response.data), {
        status: response.status,
        headers:response.headers,
      });
    } catch (error) {
      console.error("Error making API request:", error);
      return new Response(
        JSON.stringify({ message: "Error making Internal Request" }),
        {
          status: error.response?.status || 500,
        }
      );
    }
  }
  return new Response(JSON.stringify({ message: "Invalid Action" }), {
    status: 500,
  });
}
