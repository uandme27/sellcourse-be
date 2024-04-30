const apiUsers = 'http://localhost:5500/users'
let users;



const signIn = document.querySelector('.sign-in')
const signUp = document.querySelector('.sig-up')


const container = document.getElementById('container-login');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

signIn.addEventListener('click', () => {

    container.style.display = "block"
});
signUp.addEventListener('click', () => {

    container.style.display = "block"
});



const fetchApiUsers = async () => {
    const response = await fetch(apiUsers)
    users = await response.json()
    console.log(apiUsers)


}
fetchApiUsers()

document.getElementById('formSigup').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('nameUser').value;
    const password = document.getElementById('passwordUser').value;
    const email = document.getElementById('emailUser').value;

    const formSigup = {
        name,
        password,
        email
    }
    console.log(formSigup)
    createUser(formSigup)



});



const createUser = async (formSigup) => {

    // Gửi yêu cầu POST đến máy chủ
    const response = await fetch(`${apiUsers}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Đã thêm header 'Content-Type'
        },
        body: JSON.stringify(formSigup)
    });

    if (response.ok) {
        console.log('Đăng ký thành công');


        // window.location.href = '/admin/product';
    } else {
        // Nếu có lỗi, xử lý lỗi ở đây
        console.error('Đăng ký thất bại');
        console.log(formSigup)
        console.log(response)

    }
}


// login
const login = document.getElementById('formSigin');
if (login) {
    login.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('emailLogin').value;
        const pw = document.getElementById('passwordLogin').value;
        const matchingUser = users.find((user) => user.email === email && user.password === pw);
        console.log(matchingUser)
        if (matchingUser) {
            // Redirect hoặc thực hiện các hành động khác khi người dùng được xác thực
            console.log('thanh cong')
            localStorage.setItem('currentUser', JSON.stringify(matchingUser));
            location.reload();

        }
        else {
            const errElement = document.getElementById('err');
            if (errElement) {
                errElement.innerHTML = 'Email hoặc mật khẩu không đúng.';
            }
        }
    });
}

document.querySelector('.close').addEventListener('click', () => {
    container.style.display = 'none'
})



const storedUser = localStorage.getItem('currentUser');
console.log(storedUser)
if (storedUser) {
    const user = JSON.parse(storedUser);

    // Cập nhật giao diện với thông tin người dùng
    const avatarContainer = document.querySelector('.avatar');


    avatarContainer.innerHTML = `
    <div class="dropdown topbar-head-dropdown ms-1 header-item" style=" margin-left: 380px;" >
                    <a href="/cart"><i style="font-size: 36px;" class="bx bx-shopping-bag fs-36"></i>
                        <span style="position: relative; top:30px" class="cart-number position-absolute topbar-badge cartitem-badge fs-10 translate-middle badge rounded-pill bg-info">5</span>
                    </button></a>
                        
                  
                </div>
        <a href="#">
        <img style='width:40px; height:40px; border: 1px solid black; margin-left:24px' src="/images/avatars/placeholder.png" class="header_widgets_avatar" alt="">
    </a>
    <div uk-drop="mode: click;offset:5" class="header_dropdown profile_dropdown">
        <ul>
            <li>
                <a href="#" class="user">
                    <div class="user_avatar">
                        <img src="/images/avatars/avatar-2.jpg" alt="">
                    </div>
                    <div class="user_name">
                        <div>${user.name}</div>
                        <span>${user.email}</span>
                    </div>
                </a>
            </li>
            <li>
                <hr>
            </li>

            <li>
                <a href="#">
                    <ion-icon name="person-circle-outline" class="is-icon"></ion-icon>
                    My Account
                </a>
            </li>


            <li>
                <a href="#">
                    <ion-icon name="settings-outline" class="is-icon"></ion-icon>
                    Account Settings
                </a>
            </li>
            <li>
                <hr>
            </li>
           
            <li>
                <a href="#" class='logOut'>
                    <ion-icon name="log-out-outline" class="is-icon"></ion-icon>
                    Log Out
                </a>
            </li>
        </ul>
    </div>
        `;

}

const logOut = document.querySelector('.logOut')
logOut.addEventListener('click', () => {
    localStorage.clear()
    location.reload();
}
)
