import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const HeaderTitle = () => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const pageHeaders = [
    {
      path: "/dashboard",
      title: (
        <>
          <span>Welcome,</span> {user.full_name}
        </>
      ),
      description:
        "Unleash your imagination: read, write, and share captivating stories with the world.",
    },
    {
      path: "/stories",
      title: (
        <>
          <span>Explore</span> Stories
        </>
      ),
      description:
        "Dive into a world of diverse tales and discover your next favorite story.",
    },
    {
      path: "/profile",
      title: (
        <>
          <span>Your</span> Story Hub
        </>
      ),
      description:
        "Manage your stories, edit your profile, and track your reading journey.",
    },
  ];

  const currentPage =
    pageHeaders.find((page) => location.pathname.startsWith(page.path)) ||
    pageHeaders[0];

  return (
    <>
      <h2 className="db-title mb-3">{currentPage.title}</h2>
      <p className="text-foreground-alt">{currentPage.description}</p>
    </>
  );
};

export default HeaderTitle;
