import { Link, useNavigate } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Breadcrumb = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="db-breadcrumb mb-5">
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <ul className="breadcrumb-menu">
            {Object.entries(data).map(([label, path], index, array) => (
              <li key={label} className="breadcrumb-item">
                {path === "current" ? (
                  <span className="breadcrumb-link active">{label}</span>
                ) : (
                  <Link to={path} className="breadcrumb-link">
                    {label}
                  </Link>
                )}
                {index < array.length - 1 && <BsChevronRight />}
              </li>
            ))}
          </ul>
        </div>

        <div className="col flex justify-end">
          <button className="back-button" onClick={() => navigate(-1)}>
            <BsChevronLeft />
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
