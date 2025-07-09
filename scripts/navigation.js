/**
 * this creates the navigation items in the sidebar
 */


const navContainer = document.getElementById("nav-items");

let openCategoryWrapper = null;

function createNavItem(item, index, parentCategory = null) {
  if (item.type === "category") {
    // Category item
    const categoryWrapper = document.createElement("div");
    categoryWrapper.className = "nav-category-wrapper";
    const navCategory = document.createElement("a");
    navCategory.className = "nav-item nav-category";
    navCategory.innerHTML = `
      <div class="icon-container">
        <i class="fa-regular ${item.icon}"></i>
        <i class="fa-regular fa-chevron-down chevron-icon" style="display:none;"></i>
      </div>
      <span class="nav-text">${item.title}</span>
    `;
    navCategory.href = "#";
    navCategory.onclick = (e) => {
      e.preventDefault();
      if (openCategoryWrapper && openCategoryWrapper !== categoryWrapper) {
        closeCategory(openCategoryWrapper);
      }
      toggleCategory(categoryWrapper, navCategory, item.children);
    };
    navCategory.onmouseenter = () => {
      navCategory.querySelector(".icon-container > .fa-regular").style.display = "none";
      navCategory.querySelector(".chevron-icon").style.display = "inline-block";
    };
    navCategory.onmouseleave = () => {
      navCategory.querySelector(".icon-container > .fa-regular").style.display = "inline-block";
      navCategory.querySelector(".chevron-icon").style.display = "none";
    };
    categoryWrapper.appendChild(navCategory);
    navContainer.appendChild(categoryWrapper);
  } else if (item.type === "divider") {
    // Divider item
    const divider = document.createElement("div");
    divider.className = "nav-divider";
    navContainer.appendChild(divider);
  } else if (parentCategory) {
    // Nested nav item
    const nestedNav = document.createElement("a");
    nestedNav.className = "nav-item nav-nested-item";
    nestedNav.innerHTML = `
      <div class="icon-container">
        <i class="fa-regular ${item.icon}"></i>
      </div>
      <span class="nav-text">${item.title}</span>
    `;
    nestedNav.href = "#";
    nestedNav.onclick = (e) => {
      e.preventDefault();
      loadPage(item.url, nestedNav);
    };
    parentCategory.appendChild(nestedNav);
  } else {
    // Normal nav item
    const navItemstem = document.createElement("a");
    navItemstem.className = "nav-item" + (index === 0 ? " active" : "");
    navItemstem.innerHTML = `
          <div class="icon-container">
            <i class="fa-regular ${item.icon}"></i>
          </div>
          <span class="nav-text">${item.title}</span>
        `;
    navItemstem.href = "#";
    navItemstem.onclick = (e) => {
      e.preventDefault();
      loadPage(item.url, navItemstem);
    };
    navContainer.appendChild(navItemstem);
  }
}

function toggleCategory(wrapper, navCategory, children) {
  let expanded = wrapper.classList.contains("expanded");
  if (!expanded) {
    // Expand
    wrapper.classList.add("expanded");
    openCategoryWrapper = wrapper;
    // Insert nested items
    const nestedList = document.createElement("div");
    nestedList.className = "nav-nested-list";
    children.forEach((child, idx) => createNavItem(child, idx, nestedList));
    wrapper.appendChild(nestedList);
    setTimeout(() => {
      nestedList.style.maxHeight = nestedList.scrollHeight + "px";
      nestedList.style.opacity = 1;
      nestedList.classList.add("fade-in");
    }, 10);
  } else {
    // Collapse
    closeCategory(wrapper);
  }
}

function closeCategory(wrapper) {
  const nestedList = wrapper.querySelector(".nav-nested-list");
  if (nestedList) {
    nestedList.classList.remove("fade-in");
    nestedList.style.maxHeight = "0px";
    nestedList.style.opacity = 0;
    setTimeout(() => {
      if (nestedList.parentNode) nestedList.parentNode.removeChild(nestedList);
      wrapper.classList.remove("expanded");
      if (openCategoryWrapper === wrapper) openCategoryWrapper = null;
    }, 120);
  } else {
    wrapper.classList.remove("expanded");
    if (openCategoryWrapper === wrapper) openCategoryWrapper = null;
  }
}

// Clear navContainer first
navContainer.innerHTML = "";
navItems.forEach((item, index) => {
  createNavItem(item, index);
});

// Close all categories when sidebar is not hovered
const sidebar = document.querySelector('.sidebar');
sidebar.addEventListener('mouseleave', () => {
  document.querySelectorAll('.nav-category-wrapper.expanded').forEach(closeCategory);
});

function loadPage(url, selectedItem) {
  const frame = document.getElementById("frame");
  frame.src = url;
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => item.classList.remove("active"));
  selectedItem.classList.add("active");
}

document.querySelector(".fa-discord").parentElement.onclick = () => {
  window.location.href = "https://dsc.gg/vaporr";
};

document.querySelector(".fa-coins").parentElement.onclick = () => {
  showDonateModal();
};

document.querySelector(".fa-handshake").parentElement.onclick = () => {
  const partnersUrl = "https://raw.githack.com/gustambolopez/vaporv3/main/page/partners.html";
  const frame = document.getElementById("frame");
  frame.src = partnersUrl;
};

document.querySelector(".fa-cog").parentElement.onclick = () => {
  const settingsUrl = "https://raw.githack.com/gustambolopez/vaporv3/main/page/options.html";
  const frame = document.getElementById("frame");
  frame.src = settingsUrl;
};

function setActiveNav(title) {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => item.classList.remove("active"));
  const activeItem = Array.from(navItems).find((item) =>
    item.textContent.includes(title)
  );
  if (activeItem) activeItem.classList.add("active");
}

document.querySelector(".fa-expand").parentElement.onclick = () => {
  const frame = document.getElementById("frame");
  if (frame.requestFullscreen) {
    frame.requestFullscreen();
  } else if (frame.mozRequestFullScreen) {
    // firefoxy :)
    frame.mozRequestFullScreen();
  } else if (frame.webkitRequestFullscreen) {
    // ew, chrome, safari??, whats opera..?
    frame.webkitRequestFullscreen();
  } else if (frame.msRequestFullscreen) {
    // INTERNET EXPLORER AND EDGE *vomits*
    frame.msRequestFullscreen();
  }
};
