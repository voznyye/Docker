

class Message {
    static createMessage(blockSelector) {
        const parentBlock = document.querySelector(blockSelector);
        const message = document.createElement("div");
        message.classList.add("sign__message");
        message.style.cssText = `
            margin: 0px auto 10px;
            text-align: center;
            font-weight: 700;
            font-size: 20px;
        `
        parentBlock.insertAdjacentElement("afterend", message);
    }

    static addMessage(messageText){
        const message = document.querySelector(".sign__message");
        message.textContent = messageText;
    }

    static deleteMessage() {
        const message = document.querySelector(".sign__message");
        message.remove();
    }
}

export {Message};