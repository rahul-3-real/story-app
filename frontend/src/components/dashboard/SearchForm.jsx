import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { PiSlidersDuotone } from "react-icons/pi";

const SearchForm = () => {
  const [searchFilterOpen, setSearchFilterOpen] = useState(false);
  const formRef = useRef(null);

  const handleToggleSearchFilter = () => {
    setSearchFilterOpen(!searchFilterOpen);
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setSearchFilterOpen(false);
    }
  };

  useEffect(() => {
    if (searchFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchFilterOpen]);

  return (
    <form
      className={`db-search ${searchFilterOpen ? "active" : ""}`}
      ref={formRef}
    >
      <div className="form">
        <span className="icon">
          <IoIosSearch />
        </span>
        <input name="search" id="search" placeholder="Search..." />
        <button
          type="button"
          className="filter"
          onClick={handleToggleSearchFilter}
        >
          <PiSlidersDuotone />
        </button>
      </div>
      {searchFilterOpen && (
        <div className="content">
          <ul>
            <li>
              <Link to="#">Popular Stories</Link>
            </li>
            <li>
              <Link to="#">Categories</Link>
            </li>
            <li>
              <Link to="#">Authors</Link>
            </li>
            <li>
              <Link to="#">Genres</Link>
            </li>
          </ul>
        </div>
      )}
    </form>
  );
};

export default SearchForm;
