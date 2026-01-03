import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [openAccount, setOpenAccount] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    setOpenAccount(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      navigate("/");
      return;
    }
    navigate(`/?search=${encodeURIComponent(search)}`);
  };

  return (
    <header className="header">
      <div
        className="logo"
        onClick={() => {
          setSearch("");
          navigate("/");
        }}
      >
        Fiesta
      </div>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {/* ACTIONS */}
      <div className="actions">
        <button className="cart-btn" onClick={() => navigate("/cart")}>
          Cart
        </button>

        <button className="cart-btn" onClick={() => navigate("/orders")}>
          Orders
        </button>
        <div className="account-wrapper">
 <div className="account-icon" onClick={()=>setOpenAccount(!openAccount)}>
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5Zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5Z"
      fill="black"
    />
  </svg>
</div>


          {openAccount && (
            <div className="account-dropdown">
              {user ? (
                <>
                  <p className="username">Hi, {user.name.toUpperCase()}</p>
                  <button onClick={logout}>Logout</button>
                </>
              ) : (
                <>
                  <button onClick={() => navigate("/login")}>Login</button>
                  <button onClick={() => navigate("/register")}>
                    Signup
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

