const ts = require('typescript');
const TSLib = require('./lib/ts.js');
const fs = require('fs');
const filePath = './ts/Series/Scatter/ScatterSeriesDefaults.ts';
const fileContent = fs.readFileSync(filePath, 'utf8');
const sourceFile = ts.createSourceFile(
    filePath,
    fileContent,
    ts.ScriptTarget.Latest,
    true
);

const tree = {};

function travelSource(src) {

    function nodeCheck(node) {
        if (node.kind === ts.SyntaxKind.JSDoc) {
            TSLib.getDocletTagInfos([node]);
            return true;
        }
        return false;
    }

    function travel(node) {
        for (const subNode of node.getChildren()) {
            if (!nodeCheck(subNode)) {
                travel(subNode);
            }
        }
    }

    ts.forEachChild(src, node => {
        if (!nodeCheck(node)) {
            travel(node);
        }
    });
}

travelSource(sourceFile);
