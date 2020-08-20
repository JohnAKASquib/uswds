const config = {
  context: "",
  nav: {
    search: false,
    links: {
      text: "Current section",
      is_current: true,
      id: "nav-section-one",
      links: "&subnav_links",
      href: "#",
      if_prefix: "basic-",
      text: "Section",
      id: "nav-section-two",
      links3: "*subnav_links",
      text: " Simple link",
      href: "javascript:void(0)"
    }
  }
};

function navigations(config) {
  let htmlString = [];
  console.log("1");
  for (const link in config.nav.links) {
    let count = 0;
    console.log("whats in link: " + config.nav.links[link]);
    htmlString.push("<li>\n");
    if (link) {
      //console.log("3");
      htmlString.push(`<button class="usa-accordion__button usa-nav__link`);
      //if (link.is_current) {
      //console.log("output this: "+config.nav.links[link] + " Next: "+link )
      if (config.nav.links[link] == true && link == "is_current") {
        htmlString.push(`usa-current`);
        //console.log("when do i get here")
      }
      htmlString.push(
        `" aria-expanded="false" aria-controls="${config.nav.id_prefix} ${link.id}"><span>${link.text}</span></button>`
      );
    }
    //console.log("blah: " + link);

    if (config.nav.mega) {
      htmlString.push(
        `<div id="${config.nav.id_prefix} ${link.id}" class="usa-nav__submenu usa-megamenu">
        </div>`
      );
    } else {
      htmlString.push(
        `<ul id="${config.nav.id_prefix} ${link.id}" class="usa-nav__submenu usa-megamenu">
        </ul>`
      );
    }

    if (
      config.nav.if_prefix == "basic-" ||
      config.nav.id_prefix == "extended-"
    ) {
      //console.log("why are u: " + link);
      //console.log("start of if loop");
      //for (let child = 0; child < link.length; child++) {
      for (const child in link) {
        //console.log("i am a child: " + child);
        if (count < 4) {
          //console.log("hiiiiii");
          count++;
          htmlString.push(
            `<li class="usa-nav__submenu-item">
              <a href="${child.href}" class="`
          );
          if (child.is_current) {
            htmlString.push("usa-current");
          }
          htmlString.push(`"> ${child.text}</a>\n </li>`);
        }
      }
    } else {
      htmlString.push(`<div class="grid-row grid-gap-4">`);
      for (const group in config.links) {
        //| batch(3)
        console.log("hellooooo");
        htmlString.push(
          `<div class="usa-col">
        <ul class="usa-nav__submenu-list">`
        );
        for (const child in group) {
          //console.log("4");
          htmlString.push(
            `<li class="usa-nav__submenu-item">
            <a href="${child.href}" class="`
          );
          if (child.is_current) {
            htmlString.push(`usa-current`);
          }
          htmlString.push(
            `">${child.text}</a>\n
          </li>`
          );
        }
        htmlString.push(
          `</ul>
        </div>`
        );
      }
      htmlString.push("</div>");
    }
    htmlString.push("</li>");
  }
  htmlString.push("</ul>");
  if (config.nav.search) {
    //  {% render '@search--header', {search: nav.search, id_prefix: nav.id_prefix}, true %}
  }
  //console.log(htmlString);
  return htmlString.join("\n");
}
