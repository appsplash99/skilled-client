import { NavbarResp1 } from "morphine-ui";
import { GrRobot } from "react-icons/gr";
import { Link } from "react-router-dom";
import { UserMenu } from "./UserMenu";

export const SkilledNavbar = ({ showMobileNav, setShowMobileNav }) => {
  return (
    <NavbarResp1
      showMobileMenu={showMobileNav}
      handleShowMobileMenu={() => setShowMobileNav(!showMobileNav)}
      desktopMenuStyle={{ backgroundColor: "none" }}
      mobileMenuStyle={{ backgroundColor: "var(--grey-300)" }}
      style={{ overflow: "hidden", backgroundColor: "var(--light)", position: "fixed", padding: "0", zIndex: "6000" }}
      actionButtonsContainer={<UserMenu />}
      navbarLogo={
        <div className="flex flex--column align-items--c justify-content--c font-weight--600 mx--sm">
          <Link className="nav__link text--dark" to="/">
            <GrRobot style={{ fontSize: "var(--text-xxxl)", color: "var(--themeRed)" }} />
          </Link>
          <div className="text--xs">Skilled</div>
        </div>
      }
    ></NavbarResp1>
  );
};
