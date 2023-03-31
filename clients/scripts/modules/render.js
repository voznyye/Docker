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


export {renderUserCard, sortUsersID};