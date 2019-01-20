const url = "https://api.github.com/users/sdbowen/repos?sort=updated";

// GET repo data from GitHub API
fetch(url)
  .then(response => {
    return response.json();
  })
  .then(function(jsonResponse) {
    parseData(jsonResponse);
  });

let parseData = ApiData => {
  reposDetail = [];

  for (let i = 0; i < 3; i++) {
    let currentRepo = {};

    currentRepo.updatedDate = ApiData[i].updated_at;
    currentRepo.name = ApiData[i].name;
    currentRepo.description = ApiData[i].description;
    currentRepo.language = ApiData[i].language;

    reposDetail.push(currentRepo);
  }

  updatePageElements(reposDetail);
};

let updatePageElements = data => {
  let dateElements = document.querySelectorAll(".heading-date");
  let nameElements = document.querySelectorAll(".repo-item__link");
  let descElements = document.querySelectorAll(".repo-item__description p");
  let languageElements = document.querySelectorAll(".repo-item__language-text");

  for (let i = 0; i < 3; i++) {
    dateElements[i].innerHTML = data[i].updatedDate;
    nameElements[i].innerHTML = data[i].name;
    descElements[i].innerHTML = data[i].description;
    languageElements[i].innerHTML = data[i].language;
    languageElements[i].className += ` repo-item__language-text--${data[
      i
    ].language.toLowerCase()}`;
  }
};
