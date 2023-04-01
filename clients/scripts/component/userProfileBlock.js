function renderUserProfileBlock() {
    let item = {id: localStorage.getItem('user_name'), name: localStorage.getItem('user_name')};

    return `
        <div class="user__block">
            <div class="user__id" style="display: none">ID: ${item.id}</div>
            <div class="user__name">
                User profile: <a href="profile.html">${item.name}</a>
            </div>
        </div>
    `
}

export {renderUserProfileBlock};
