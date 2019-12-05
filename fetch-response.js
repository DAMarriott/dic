// FetchResponse
class FetchResponse {
  ok: boolean;
  text: Function;
  json: Function;
  statusCode: number;
  statusText: string;
  body: ReadableStream;
}

let response = new FetchResponse();
response.ok = false;
response.text = () => "No message";
response.json = () => '{ "message": "No message" }';
response.statusCode = 400;
response.statusText = "Not found.";
response.body = new ReadableStream();

return new Response("No definition", 404);
