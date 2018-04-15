import PostMessageStream from 'post-message-stream';
import AplaEvo from './libs/aplaEvo';
let contentStream;

init();

function init() {
    conntectToContent();
    injectScript();
};

function conntectToContent() {
    contentStream = new PostMessageStream({
        name: 'page',
        target: 'content',
    })
    contentStream.on('data', (data) => console.log('recieved inpage', data))
    contentStream.write('send from inpage');
}

function injectScript() {
    window.aplaEvo = new AplaEvo({
        stream: contentStream
    });
}