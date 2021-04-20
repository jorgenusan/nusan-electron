class Signin{
    constructor(){
        this.errorMessage = document.querySelector('.error-message');
        this.userNick = document.querySelector('.user-nick');
        this.userPassword = document.querySelector('.user-pwd');
        this.signinButton = document.querySelector('.sign-in-bttn');

        TimeRanges.parser = new DOMParser();

        this.eventListeners();
    }

    eventListeners(){
        this.userNick.addEventListener('keyup', () =>{
                this.signinButton.disabled = this.userNick.validity.valid;
        });

        this.signinButton.addEventListener('submit', this.signinUser.bind(this))
    }

    signinUser(event){
        event.preventDefault();

        const nick = this.userNick.nodeValue;

        fetch(url)
        .then(response => response.text())
        .then(this)
    }
}