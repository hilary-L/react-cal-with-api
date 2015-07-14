passError
=========

Handle success and failure with two different callbacks. Lets you get
rid of most `if (err) return cb(err);` constructs.


Example
-------

Send errors reported by `fs.readFile` straight to `cb`:

```javascript
var passError = require('passerror'),
    fs = require('fs');

function getLines(fileName, cb) {
    fs.readFile(fileName, 'utf-8', passError(cb, function (contents) {
        cb(null, contents.split(/\r?\n|\n?\r/));
    }));
}
```


License
-------

Licensed under a standard 3-clause BSD license -- see the
`LICENSE`-file for details.
