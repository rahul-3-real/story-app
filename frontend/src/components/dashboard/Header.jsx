import { SearchForm, HeaderTitle } from "./index";

const Header = () => {
  return (
    <header className="db-header">
      <div className="container">
        <div className="grid grid-cols-2 gap-5">
          <div className="col">
            <HeaderTitle />
          </div>
          <div className="col flex items-center justify-end">
            <SearchForm />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
