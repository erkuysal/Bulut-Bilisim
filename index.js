const express = require('express')
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express()
const port = 3005

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})



app.get('/login/:username', (req, res) => {
    res.send("Girildi.")
    console.log(`Bir ${req.params.username} girmeye calisti.`)
})


app.get('/image/:width/:height', async (req, res) => {
    var cevap = await fotoyap(req.params.width, req.params.height);
    res.setHeader("Content-Type", cevap.header)
    res.send(cevap.image)
});

app.get('/image', async (req, res) => {
    res.send("Bu Degil...")
});

app.post('/image', async (req, res) => {
    var a = req.data
    var b = req.body
    var cevap = await fotoyap(req.body.width, req.body.height);
    res.setHeader("Content-Type", cevap.header)
    res.send(cevap.image)
});

app.post('/image/:width/:height', async (req, res) => {
    var cevap = await fotoyap(req.params.width, req.params.height);
    res.setHeader("Content-Type", cevap.header)
    res.send(cevap.image)
});



async function fotoyap(width,height){
    const imageUrl = `https://placehold.co/${width}x${height}`;

    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer'});
        var cevap = {
            image: response.data,
            header: response.headers['content-type'],
        }
        return cevap
    }
    catch (error) {
        console.error('Error fetching the image:', error);
    }
}



