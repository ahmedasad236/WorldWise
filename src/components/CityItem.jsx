import styles from './CityItem.module.css';
import formatDate from '../services/formateDate';
import { Link } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';

function CityItem({ city }) {
  const { currentCity, removeCity } = useCities();
  const { cityName, emoji, date, id, position } = city;
  async function handleRemoveCity(e) {
    e.preventDefault();
    await removeCity(id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles['cityItem--active'] : ''
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button
          className={styles.deleteBtn}
          onClick={handleRemoveCity}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
