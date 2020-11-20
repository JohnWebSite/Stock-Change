class initialForm {
    constructor(cardBody, spinner, listCompany) {
        this.cardBody = cardBody;
        this.spinner = spinner;
        this.listCompany = listCompany;
    }

    creationCardBody() {

        const myTitle = document.createElement('h1');
        myTitle.innerHTML = "Search Nasdaq Stock";
        const divSearch = document.createElement('div');
        divSearch.classList = "input-group";
        const inputSearch = document.createElement('input');
        inputSearch.type = "text";
        inputSearch.classList = "form-control";
        inputSearch.id = "myResearch";
        const divButton = document.createElement('div');
        divButton.classList = "input-group-append";
        const button = document.createElement('button');
        button.classList = "btn btn-outline-primary";
        button.type = "button";
        button.id = "button-addon2";
        button.innerText = "Search";
        divButton.appendChild(button);
        divSearch.appendChild(inputSearch);
        divSearch.appendChild(divButton);
        this.cardBody.appendChild(divSearch);

    }

    creationSpinner() {
        const divSpinner = document.createElement('div');
        divSpinner.classList = "spinner-border spinner";
        divSpinner.role = "status";
        divSpinner.id = "spinner";
        const spanLoading = document.createElement('span');
        spanLoading.classList = "sr-only";
        divSpinner.appendChild(spanLoading);
        this.spinner.appendChild(divSpinner);

    }

    creationCompanyList() {
        const ul = document.createElement('ul');
        ul.id = "the_List_FMP";
        ul.classList = "list-group list-group-flush";
        this.listCompany.appendChild(ul);

    }

    creationTotal() {
        this.creationCardBody();
        this.creationSpinner();
        this.creationCompanyList();
    }

}