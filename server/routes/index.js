const express = require('express');
const fs = require('fs');
const ejs = require('ejs')
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: './uploads' });
const moment = require('moment');
const _ = require('underscore');
const mammoth = require('mammoth');
const pretty = require('pretty')
const template = require('../templates/privacy');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/personal', function(req, res, next) {
  res.send(req.query)
})

router.post('/favorite', function(req, res, next) {
  res.send(req.body)
})

router.get('/preview/:fileName', function(req, res) {
  const file = `./output/` + req.params.fileName;
  console.log('[preview]', file)
  fs.readFile(file, 'utf8', (err, text) => {
    res.send(text);
  });
  // res.render(file); // Set disposition and send it.
});

router.get('/download/:fileName', function(req, res) {
  const file = `./output/` + req.params.fileName;

  let { query } = req
  console.log('[download query]',query)

  let fileName = !!query.customFileName ? decodeURIComponent(query.customFileName) :  moment().format('YYYY-MM-DD-HH-MM') + '.html'
  res.download(file,fileName); // Set disposition and send it.
});

router.post('/upload', upload.single('file'), function(req, res, next) {
  const { file,body,query } = req;
  console.log(req)
  let bodyParse = JSON.parse(body)
  function transformElement(element) {
    if (element.children) {
      var children = _.map(element.children, transformElement);
      element = { ...element, children: children };
    }
    if (element.type === 'paragraph') {
      element = transformParagraph(element);
    }
    return element;
  }

  function transformParagraph(element) {
    if (element.alignment === 'center' && !element.styleId) {
      return { ...element, styleName: 'center' };
    } else {
      return element;
    }
  }

  let options = {
    styleMap: ['u => u', "p[style-name='center'] => p.center"],
    transformDocument: transformElement,
  };


  mammoth
    .convertToHtml({ path: './uploads/' + file.filename }, options)
    .then(function(result) {
      let templateString = fs.readFileSync('./templates/default.html', 'utf-8')
      var html = pretty(result.value); // The generated HTML
      var messages = result.messages; // Any messages, such as warnings during conversion
      let title = html.match(/[^><]+(?=<\/p>)/gim)[0]
      console.log('[处理文件]')
      let customTitle = !!bodyParse.options.customTitle ? decodeURIComponent(bodyParse.options.customTitle) : title
   
      let ejsData = {
        title: customTitle,
        updateTime: moment().format('YYYY-MM-DD-HH:MM:SS'),
        content: html
      }

      let renderString = ejs.render(templateString, ejsData)

      // console.log(html)
      fs.writeFile('./output/' + file.filename + '.html', renderString, data => {
        // console.log('文件写入成功：', template(html));
        res.send({
          fileName: file.filename,
          html: renderString
        })
      });

    })
    .done();



})

module.exports = router;
