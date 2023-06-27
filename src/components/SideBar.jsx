import styles from './Sidebar.module.css';
import Footer from './Footer';
import Logo from './Logo';
import AppNav from './AppNav';

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <ul>List of cities</ul>
      <Footer />
    </div>
  );
}
export default SideBar;
