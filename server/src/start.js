const server = require("./server");
require("dotenv").config();

const PORT = process.env.DB_PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
