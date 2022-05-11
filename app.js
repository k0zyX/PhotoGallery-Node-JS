const express = require('express');

const app = express();

app.use(express.static("public"));

const port = 3000;

app.listen(port, () => {
    console.log(`Server started at ${port} port`);
});

app.get('/', (req, res) => {
    const photo = {
        id:1,
        name:"Photo Name",
        description:"Photo Desc",
    }
    res.send(photo);
});
