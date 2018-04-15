import PostMessageStream from 'post-message-stream';
import AplaEvo from './libs/aplaEvo';
let contentStream;

init();

function init() {
    conntectToContent();
    injectScript();
    injectButton();
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

function injectButton() {
    const { host, pathname } = window.location;

    if (host === 'patents.google.com' && pathname.substr(0,8) === "/patent/") {
        const el = document.querySelector(".knowledge-card-action-bar.patent-result");

        const btn = document.createElement('a');
        btn.innerHTML = 'Роспатент';

        el.appendChild(btn);
        btn.id = 'link';
        btn.className = 'style-scope';
        const [ nil, nbr ] = pathname.match(/\/patent\/([^\/]*)\/\w*/);

        // console.log(nbr);

        btn.addEventListener('click', () => {
            console.log('click');
            window.aplaEvo.sendTransaction({
                name: 'add_patent',
                data: {
                  pat_num: 'Google',
                  description: 'Patent'
                },
                text: {
                  title: "Добавить патент",
                  description: "Простой патент"
                }
              });
        })
    }
}