const div = document.getElementById("marquee");
const marquee = new Marquee(div);
marquee.realTimePrice();

const cardBody = document.getElementById("card-body");
const spinner = document.getElementById("divSpinner");
const companyList = document.getElementById("list-company");
const form = new initialForm(cardBody, spinner, companyList);
form.creationTotal();

const goSearch = document.getElementById('button-addon2');
const spinList = document.getElementById("spinner");
const result = new SearchForm(goSearch, spinList);


goSearch.addEventListener('click', () => {
    result.afficher();
});



