import { NavbarResp1, BtnInverted, Btn, DataBadgeIcon } from '../morphine-ui';
import { GrRobot } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { RiPlayList2Fill } from 'react-icons/ri';
import { MdWatchLater } from 'react-icons/md';
import { AiFillLike } from 'react-icons/ai';
import { useLibraryContext } from '../../context/libraryState';

export const SkilledNavbar = ({ showMobileNav, setShowMobileNav }) => {
  const {
    state: { playlists, likedVideos, watchLater },
    dispatch,
  } = useLibraryContext();
  return (
    <NavbarResp1
      showMobileMenu={showMobileNav}
      handleShowMobileMenu={() => setShowMobileNav(!showMobileNav)}
      desktopMenuStyleProp={{ backgroundColor: 'none' }}
      mobileMenuStyleProp={{ backgroundColor: 'none' }}
      styleProp={{
        overflow: 'hidden',
        backgroundColor: 'var(--light)',
        position: 'fixed',
        padding: '0',
        zIndex: '6000',
      }}
      actionButtonsContainer={
        <>
          <BtnInverted
            shape="rounded"
            variant="primary"
            btnSize="sm"
            styleProp={{
              padding: 'var(--space-xxxs) var(--space-md)',
              fontWeight: '500',
              border: '2px solid var(--themePrimary)',
            }}>
            Login
          </BtnInverted>
          <Btn
            variant="primary"
            btnSize="sm"
            styleProp={{
              padding: 'var(--space-xxxs) var(--space-md)',
              fontWeight: '500',
              border: '2px solid var(--themePrimary)',
            }}>
            SignUp
          </Btn>
        </>
      }
      navbarLogo={
        <div className="flex flex--column align-items--c justify-content--c font-weight--600 mx--sm">
          <Link className="nav__link text--dark" to="/">
            <GrRobot
              style={{
                fontSize: 'var(--text-xxxl)',
                color: 'var(--themeRed)',
              }}
            />
          </Link>
          <div className="text--xs">Skilled</div>
        </div>
      }>
      <>
        <Link className="nav__link text--dark" to="/playlist">
          <DataBadgeIcon
            iconStyleProp={{
              backgroundColor: 'inherit',
              margin: 0,
            }}
            data={playlists.length}
            variant="square"
            icon={<RiPlayList2Fill className="text--xxl" />}></DataBadgeIcon>
        </Link>
        <Link className="nav__link text--dark" to="/watch-later">
          <DataBadgeIcon
            iconStyleProp={{
              backgroundColor: 'inherit',
              margin: 0,
            }}
            data={watchLater.length}
            variant="square"
            icon={<MdWatchLater className="text--xxl" />}></DataBadgeIcon>
        </Link>
        <Link className="nav__link text--dark" to="/liked-videos">
          <DataBadgeIcon
            iconStyleProp={{
              backgroundColor: 'inherit',
              margin: 0,
            }}
            data={likedVideos.length}
            variant="square"
            icon={<AiFillLike className="text--xxl" />}></DataBadgeIcon>
        </Link>
      </>
    </NavbarResp1>
  );
};
