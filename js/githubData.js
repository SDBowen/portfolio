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
    dateElements[i].innerHTML = formatDate(data[i].updatedDate);
    nameElements[i].innerHTML = data[i].name;
    descElements[i].innerHTML = data[i].description;
    languageElements[i].innerHTML = data[i].language;
    languageElements[i].className += ` repo-item__language-text--${data[
      i
    ].language.toLowerCase()}`;
  }
};

let formatDate = repoItemDate => {
  let year = repoItemDate.slice(0, 4);
  let month = repoItemDate.slice(5, 7) - 1;
  let day = repoItemDate.slice(8, 10);
  let hour = repoItemDate.slice(11, 13);
  let minute = repoItemDate.slice(14, 16);
  let seconds = repoItemDate.slice(17, 19);

  let repoDate = new Date(Date.UTC(year, month, day, hour, minute, seconds));
  let currentDate = new Date(Date.now());

  let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  let oneHour = 60 * 60 * 1000;

  let difference = Math.round(
    Math.abs((repoDate.getTime() - currentDate.getTime()) / oneDay)
  );

  if (difference > 1) {
    return `Updated ${difference} days ago`;
  } else if (difference === 1) {
    return "Updated 1 day ago";
  }

  difference = Math.round(
    Math.abs((repoDate.getTime() - currentDate.getTime()) / oneHour)
  );

  if (difference > 1) {
    return `Updated ${difference} hours ago`;
  } else {
    return "Updated 1 hour ago";
  }
};
