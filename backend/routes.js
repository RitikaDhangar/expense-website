const fs = require('fs');
const InputData = ((req, res) => {
    const Url = req.url;
        const Method = req.method;
        if (Url === '/') {
            res.write('<html>')
            res.write('<body>')
            res.write('<p>my paragraph</p>')
            res.write('<form method="POST" action="/contact" > <input type="text" name="Submit"/><button type="submit">Submit</button> </form>')
            res.write('</body>')
            res.write('</html>')
            res.end();
        }
        if (Url === '/contact' && Method == 'POST') {
            const body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            })
            req.on('end', () => {
                const parsedBody=Buffer.concat(body).toString()
                const msg = parsedBody.split('=')[1];
    
                fs.writeFile('contact.txt', msg, () => {
                    res.statusCode=302
                    res.setHeader('Location', '/')
                    res.end()
                })
            })
           
        }
})

exports.handler = InputData;