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

const userLoged = {
    author: {}
};

const userInfo = async () => {
    const {
        value: formValues
    } = await new swal({
        title: 'Log in',
        html: '<label>First name:</label>' +
            '<input id="swal-input1" class="swal2-input">' +
            '<label>Last Name:</label>' +
            '<input id="swal-input2" class="swal2-input">' +
            '<label>Age:</label>' +
            '<input id="swal-input3" class="swal2-input">' +
            '<label>Alias:</label>' +
            '<input id="swal-input4" class="swal2-input">' +
            '<label>Avatar:</label>' +
            '<input id="swal-input5" class="swal2-input">' +
            '<label>Email:</label>' +
            '<input id="swal-input6" class="swal2-input">',
        focusConfirm: false,
        allowOutsideClick: false,
        preConfirm: () => {
            userLoged.author.first_name = document.getElementById('swal-input1').value
            userLoged.author.last_name = document.getElementById('swal-input2').value
            userLoged.author.age = document.getElementById('swal-input3').value
            userLoged.author.alias = document.getElementById('swal-input4').value
            userLoged.author.avatar = document.getElementById('swal-input5').value
            userLoged.author.id = document.getElementById('swal-input6').value
        }
    })
    if (formValues) {
        console.log(formValues)
    }
}

userInfo()

input.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        socket.emit('message', {
            user: user,
            message: input.value.trim(),
        })
        userLoged.text = input.value.trim()
        socket.emit('userInfo', userLoged)
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
    console.log(data)
    const chatLog = document.getElementById('chatLog');
    let messages = "";
    data.forEach(message => {
        messages += `
                    <div class="chatMessage">
                        <p class="email">${message.author.id}:</p>
                        <p class="time">${message.time}</p>
                        <p class="message">${message.text}</p>
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