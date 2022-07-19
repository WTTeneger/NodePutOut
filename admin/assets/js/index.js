const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

// show sidebar
menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
})

// close sidebar
closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
})

// change theme
themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');
    // установить локал сторадж для темы
    if (document.body.classList.contains('dark-theme-variables')) {
        localStorage.setItem('theme', 'dark');
    }
    else {
        localStorage.setItem('theme', 'light');
    }
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
})

// функция при загрузке страницы
window.onload = function () {
    // получаем данные из localStorage
    let data = localStorage.getItem('theme');
    // ставим тему dark-theme-variables
    if (data == 'dark') {
        themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
        themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
        document.body.classList.add('dark-theme-variables');
    }
}
// fill orders in table
// Orders.forEach(order => {
//     const tr = document.createElement('tr');
//     const trContent = `
//                         <td>${order.productName}</td>
//                         <td>${order.productNumber}</td>
//                         <td>${order.paymentStatus}</td>
//                         <td class="${order.shipping === 'Declined' ? 'danger' : order.shipping === 'pending' ? 'warning' : 'primary'}">${order.shipping}</td>
//                         <td class="primary">Details</td>
//                         `;
//     tr.innerHTML = trContent;
//     document.querySelector('table tbody').appendChild(tr);

// })