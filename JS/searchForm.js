class SearchForm {
    constructor(goSearch, spinList) {
        this.goSearch = goSearch;
        this.spinList = spinList;
    }

    async afficher() {
        this.spinList.style.display = "block";
        /*Effacer le contenu de Ul*/
        const ul = document.getElementById("the_List_FMP");
        ul.innerHTML = '';
        /*recuperer le Input*/
        const search = document.getElementById('myResearch').value;
        /*recuperer les donners de l'API*/
        let data = await this.getDataFetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${search}&limit=10&exchange=NASDAQ`);
        const companyList = document.getElementById("list-company");
        companyList.classList = "input-group-prepend resultat notActive";
        let interval = setInterval(() => {
            if (companyList.classList == "input-group-prepend resultat") {
                this.spinList.style.display = "none";
                clearInterval(interval);
            }
        }, 100);
        /*Créer la list et le contenu*/
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const li = this.creationMiniForm('li', index, "p-0 list-group-item result-search", "inherit", ul);
            const div = this.creationMiniForm('div', null, "d-flex flex-row bd-highlight result-search", "inherit", li);
            const divImage = this.creationMiniForm('div', null, "bd-highlight mini-div company-image", "center", div);
            const divName = this.creationMiniForm('div', null, "bd-highlight mini-div company-name", "left", div);
            const divPer = this.creationMiniForm('div', null, "bd-highlight mini-div company-change", "inherit", div);

            let data2 = await this.getDataFetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${element.symbol}`);
            const profile = data2.profile;

            const image = document.createElement('img');
            try {
                image.src = profile.image;
            } catch {
                image.src = "";
            }


            const a = document.createElement('a');
            a.href = "company.html?symbol=" + element.symbol;
            this.underlineNameResult(search, element.name, a, true);
            this.underlineNameResult(search, element.symbol, a, false);
            // a.innerHTML = element.name + " (" + element.symbol + ")";

            const changePercentage = document.createElement('span');
            try {
                changePercentage.innerHTML = profile.changesPercentage;
                this.changeColor(changePercentage, profile.changes);
            } catch {
                changePercentage.innerHTML = "";
            }

            changePercentage.classList = "change-percentage";


            divImage.appendChild(image);
            divName.appendChild(a);
            divPer.appendChild(changePercentage);
            if (index == (data.length - 1)) {

                companyList.classList = "input-group-prepend resultat";
            }
        }

    }

    creationMiniForm(tag, index, nameClass, style, parent) {
        const aTag = document.createElement(tag);
        aTag.id = index;
        aTag.classList = nameClass;
        aTag.style.textAlign = style;
        parent.appendChild(aTag);
        return aTag;
    }

    async getDataFetch(URL) {
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    }

    changeColor(tag, comparator) {
        if (comparator < 0) {
            tag.style.color = "red";
        }
        else {
            tag.style.color = "#22db22";
        }
    }

    underlineNameResult(input, name, tag, nameOrSymbol) {
        let inputConvert = input.toLowerCase();
        let nameConvert = name.toLowerCase();
        let indexFindWordStart = nameConvert.indexOf(inputConvert);
        if (indexFindWordStart >= 0) {
            let indexFindWordEnd = nameConvert.indexOf(inputConvert) + input.length;
            let findWord = name.substr(indexFindWordStart, (indexFindWordEnd - indexFindWordStart));
            let startWord = name.substr(0, indexFindWordStart);
            let finishWord = name.substr(indexFindWordEnd, (name.length - indexFindWordEnd));
            const mark = document.createElement('mark');
            if (nameOrSymbol) {
                tag.innerHTML = startWord;
                mark.innerHTML = findWord;
                tag.appendChild(mark);
                tag.innerHTML += finishWord;
            } else {
                tag.innerHTML += " (" + startWord;
                mark.innerHTML = findWord;
                tag.appendChild(mark);
                tag.innerHTML += finishWord + ")";
            }
        } else {
            if (nameOrSymbol) {
                tag.innerHTML = name;
            }
            else {
                tag.innerHTML += " (" + name + ")";
            }
        }
    }
}