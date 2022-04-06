const socket = io();
let user;
const form = document.getElementById('champForm');
const input = document.getElementById('chatInput');
const chatLog = document.getElementById('chatLog');

// Swal.fire({
//     title: 'Log in with your email',
//     input: 'text',
//     text: 'Write your email',
//     allowOutsideClick: false,
//     inputValidator: (value) => {
//         return !value && "Log in with a valid email!"
//     }
// }).then(result => {
//     user = result.value.trim();
// })

input.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        socket.emit('message', {
            user: user,
            message: input.value.trim(),
        })
        input.value = "";
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(form)
    let info = {};
    formData.forEach((val, key) => info[key] = val);
    socket.emit('sentChamp', info);
    form.reset();
})

socket.on('chatLog', data => {
    const chatLog = document.getElementById('chatLog');
    let messages = "";
    data.forEach(message => {
        messages += `
                    <div class="chatMessage">
                        <p class="email">${message.user}:</p>
                        <p class="time">${message.time}</p>
                        <p class="message">${message.message}</p>
                    </div>
                    `
    });
    chatLog.innerHTML = messages;
})

socket.on('champLog', data => {
    const champs = data.payload;
    const champsTemplate = document.getElementById('champsTemplate');
    fetch('templates/champsUpdated.handlebars').then(res => {
        return res.text();
    }).then(template => {
        const processedTemplate = Handlebars.compile(template);
        const html = processedTemplate({
            champs
        });
        champsTemplate.innerHTML = html;
    })
})