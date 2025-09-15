const url = "https://api.github.com/users";
const searchInputEl = document.getElementById("searchInput");
const searchButtonEl = document.getElementById("searchBtn");
const firstContainer = document.getElementById("profile-box");
const loadingEl = document.getElementById("loading");

const generateProfile = (profile) => {
  return `
    <div class="profile-box" id="profile-box"> 
      <div class="top-section">
        <div class="left">
          <div class="avatar">
            <img alt="avatar" src="${profile.avatar_url || 'default-avatar-url.jpg'}" />
          </div>
          <div class="self">
            <h1>${profile.name || 'No Name'}</h1>
            <h1>@${profile.login || 'No Username'}</h1>
          </div>
        </div>
        <a href="${profile.html_url}" target="_blank">
          <button class="primary-btn">Check Profile</button>
        </a>
      </div>

      <div class="about">
        <h2>About</h2>
        <p>${profile.bio || 'No Bio available'}</p>
      </div>
      <div class="status">
        <div class="status-item">
          <h3>Followers</h3>
          <p>${profile.followers || 0}</p>
        </div>
        <div class="status-item">
          <h3>Followings</h3>
          <p>${profile.following || 0}</p>
        </div>
        <div class="status-item">
          <h3>Repos</h3>
          <p>${profile.public_repos || 0}</p>
        </div>
      </div>
    </div>
  `;
};

const fetchProfile = async () => {
  const username = searchInputEl.value.trim();

  if (!username) {
    loadingEl.innerText = "Please enter a GitHub username.";
    loadingEl.style.color = "red";
    return;
  }

  loadingEl.innerText = "Loading...";
  loadingEl.style.color = "black";
  firstContainer.style.display = "none"; 

  try {
    const res = await fetch(`${url}/${username}`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    if (data.message === "Not Found") {
      loadingEl.innerText = "User not found.";
      loadingEl.style.color = "red";
      firstContainer.innerHTML = "";
      firstContainer.style.display = "none";
    } else {
      loadingEl.innerText = "";
      document.getElementById('profile-box-container').innerHTML = generateProfile(data);
      loadingEl.style.display = "none"; 
    }
  } catch (error) {
    console.log({ error });
    loadingEl.innerText = "An error occurred. Please try again.";
    loadingEl.style.color = "red";
    firstContainer.style.display = "none";
  }
};

searchButtonEl.addEventListener("click", fetchProfile);
