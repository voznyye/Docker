
function randomPath() {
    const path = ["./images/Ehor.jpg", "./images/ricardo.jpg"];
    const num = Math.floor(Math.random() * path.length);

    return path[num];
}

function renderUserCard(item) {
    return `
        <div class="user__block">
            <div class="user__id">ID: ${item.id}</div>
            <div class="user__name">NAME: ${item.name}</div>
            <div class="user-password">PASSWORD: ${item.password ?? "secret information"}</div>
            <div class="user__email">EMAIL: ${item.password ?? "secret information"}</div>
        </div>
    `
}

function sortUsersID(arr){
    return arr.sort((a, b) => a.id - b.id);
}

function renderProductCard(item){
    const path = randomPath();
    return  `
        <div class="hero__product product-hero">
            <h3 class="product-hero__title">${item.name}, id - ${item.id}</h3>
            <div class="product-hero__img">
                <picture><source srcset=${item.img ?? path} type="image/webp"><img src=${item.img ?? path} alt="product image" /></picture>
            </div>
            <div class="product-hero__descr">
                <p>
                    ${item.title}
                </p>
                <br>
                <p>
                    ${item.price}zł
                </p>
            </div>
            <div class="product-hero__block">
                <a class="product-hero__buy" href="#">Buy</a>
            </div>
        </div>
    `
}


export {renderUserCard, sortUsersID, renderProductCard};