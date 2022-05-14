import React from 'react';
import '../styles/Home.css';

export default function Home() {
  const style = {
    background: 'url(../assets/header-bg.jpg) no-repeat center center fixed',
  };

  return (
    <div className="Home">
      <div className="header-container">
        <div className="header" style={style}>
          <div className="filter" />
          <div className="main-content">
            <div style={{ 'margin-top': '120px' }}>
              <h1>Meet Team Librarian</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="trends profile-container">
        <h1>Product Managers</h1>
        <div className="team-profiles-container">
          <div className="team-profile">
            <div className="flip-card">
              <div className="flip-card-inner">
                <div class="flip-card-front">
                  <img src="https://avatars.githubusercontent.com/u/1973542?v=4" alt="profile" />
                </div>
                <div className="flip-card-back">
                  <img src="https://avatars.githubusercontent.com/u/73789849?v=4" alt="profile" />
                </div>
              </div>
            </div>
            <div className="profile-info">
              <h3>Addison Hernandez</h3>
              <h4>@addisonhernandez</h4>
            </div>
          </div>

          <div className="team-profile">
            <div className="flip-card">
              <div className="flip-card-inner">
                <div class="flip-card-front">
                  <img src="https://avatars.githubusercontent.com/u/73789849?v=4" alt="profile" />
                </div>
                <div className="flip-card-back">
                  <img src="https://avatars.githubusercontent.com/u/73789849?v=4" alt="profile" />
                </div>
              </div>
            </div>
            <div className="profile-info">
              <h3>Haley Jung</h3>
              <h4>@haleyjung</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="profiles-second-row">
        <div className="trends last-profile-container">
          <h1>Architecture Leads</h1>
          <div className="team-profiles-container">
            <div className="team-profile">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src="https://avatars.githubusercontent.com/u/92131794?v=4" alt="profile" />
                  </div>
                  <div className="flip-card-back">
                    <img src="https://avatars.githubusercontent.com/u/73789849?v=4" alt="profile" />
                  </div>
                </div>
              </div>
              <div className="profile-info">
                <h3>Hailee Lu</h3>
                <h4>@HuijunLu</h4>
              </div>
            </div>

            <div className="team-profile">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src="https://avatars.githubusercontent.com/u/97313452?v=4" alt="profile" />
                  </div>
                  <div className="flip-card-back">
                    <img src="https://avatars.githubusercontent.com/u/73789849?v=4" alt="profile" />
                  </div>
                </div>
              </div>
              <div className="profile-info">
                <h3>Katy Feng</h3>
                <h4>@katyfsy</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="trends last-profile-container">
          <h1>UI/UX Leads</h1>
          <div className="team-profiles-container">
            <div className="team-profile">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img
                      src="https://media-exp1.licdn.com/dms/image/C5603AQE4XVY67Liaeg/profile-displayphoto-shrink_800_800/0/1651524127212?e=1657756800&v=beta&t=azT-G3aRwkIbWVP4_Ky-IXXnmlb2jLRWKC9-vm_tzGk"
                      alt="profile"
                    />
                  </div>
                  <div className="flip-card-back">
                    <img src="https://avatars.githubusercontent.com/u/73789849?v=4" alt="profile" />
                  </div>
                </div>
              </div>
              <div className="profile-info">
                <h3>Junpeng Chang</h3>
                <h4>@jp-chang</h4>
              </div>
            </div>

            <div className="team-profile">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src="https://avatars.githubusercontent.com/u/94151508?v=4" alt="profile" />
                  </div>
                  <div className="flip-card-back">
                    <img src="https://avatars.githubusercontent.com/u/73789849?v=4" alt="profile" />
                  </div>
                </div>
              </div>
              <div className="profile-info">
                <h3>Joseph Sanfelippo</h3>
                <h4>@JosephSanfelippo</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
