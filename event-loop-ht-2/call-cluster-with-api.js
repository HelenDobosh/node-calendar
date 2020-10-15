const http = require("http");

for (let i = 0; i < 100; i++) {
  http.get("http://localhost:8000",res => {
    res.on('data', (data) =>
      console.log(data.toString())
    )
  });
}
