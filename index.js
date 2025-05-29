const express = require('express')
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors')
const {AWS_obje_alma} = require('./amazonHelper')


const app = express()
const port = 3001;

const s3BucketAddress = "https://kovva1.s3.eu-central-1.amazonaws.com/"

let corsOptions = {
    origin : ['http://localhost:3000'],
}


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use(bodyParser.json())
app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/login/:p_username/:p_password', (req, res) => {
    const { p_username, p_password } = req.params;

    const username = 'admin';
    const password = 'password';

    if (p_username === username && p_password === password) {
        console.log(`${p_username} basariyla giris yapti`);
        return res.status(200).send('Login successful');
    }

    console.log(`${p_username} ${p_password} izinsiz giris yapmayi denedi`);
    return res.status(401).send('Unauthorized');
});


/**
 * POST /login
 * JSON body parameters instead of query string
 */
app.post('/login', (req, res) => {
    const { p_username, p_password } = req.body;

    const username = 'admin';
    const password = 'password';

    if (p_username === username && p_password === password) {
        console.log(`${p_username} basariyla giris yapti`);
        return res.status(200).send('Login successful');
    }

    console.log(`${p_username} ${p_password} izinsiz giris yapmayi denedi`);
    return res.status(401).send('Unauthorized');
});

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




app.get('/item/:key', async (req, res) => {
    var address = s3BucketAddress + req.params.key
    var item = await axios.get(address, {responseType: "stream"})
    res.setHeader("content-type", "image/png")
    item.data.pipe(res)
});

app.get('/aws', async (req, res) => {
    var cevap = await AWS_obje_alma("bitcoin.png");
    var body = await cevap.Body.transformToString()
    console.log(body)
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









