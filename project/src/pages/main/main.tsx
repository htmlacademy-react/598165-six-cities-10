import {useState} from 'react';
import {CardType} from '../../components/card/card';
import {Offer} from '../../types/offer';
import CardsList from '../../components/cards-list/cards-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/locations-list/cities-list';
import {useAppDispatch} from '../../hooks';
import {changeCity} from '../../store/action';
import SortingDropdown, {Sorting, sortOffers} from '../../components/sorting/sortingDropdown';

type MainProps = {
  currentOffers: Offer[];
  currentCity: string;
}


const CITES_MAP_CLASSES = 'cities__map map';

function Main({currentOffers, currentCity}: MainProps) {
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const [sorting, setSorting] = useState<Sorting>(Sorting.Popular);
  const handelMouseEnter = (offer: Offer) => setActiveOffer(offer);
  const handelMouseLeave = () => setActiveOffer(null);

  const dispatch = useAppDispatch();

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="src/pages/main/main#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="src/pages/main/main#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList
            currentCity={currentCity}
            changeCity={(city: string) => {
              dispatch(changeCity(city));
            }}
          />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${currentOffers.length} places to stay in ${currentCity}`}</b>
              <SortingDropdown
                currentCriterion={sorting}
                changeSorting={(criteria) => setSorting(criteria)}
              />
              <div className="cities__places-list places__list tabs__content">
                <CardsList
                  cardType={CardType.Cities}
                  offers={sortOffers(currentOffers, sorting)}
                  onMouseEnter={handelMouseEnter}
                  onMouseLeave={handelMouseLeave}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <Map
                city={currentOffers[0].city}
                offers={currentOffers}
                activeOffer={activeOffer}
                mapClasses={CITES_MAP_CLASSES}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
