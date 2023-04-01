function renderUserProfileBlock() {
    let item = {id: localStorage.getItem('user_id'), name: localStorage.getItem('user_name')};

    return `
        <div class="user__block">
            <div class="user__id" style="display: none" data-id="${item.id}">ID: ${item.id}</div>
            <div class="user__name">
                User profile: <a href="profile.html">${item.name}</a>
            </div>
            <a id="logout" href="javascript:void(0);">Logout</a>
        </div>
    `
}

export {renderUserProfileBlock};
