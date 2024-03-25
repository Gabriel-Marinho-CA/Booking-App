import { Fragment } from "react";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {

  const {
    data,
    loading,
    error,
    reFetchData
  } = useFetch("/hotels?featured=true&limit=4");


  return (
    <div className="fp">
      {
        loading ? "Loading" :
          <Fragment>
            {
              data.map((item) => {
                return (
                  <div className="fpItem" key={item.id}>
                    <img
                      src={item.photos ? item.photos[0] : "https://placehold.co/241x250"}
                      alt={item.name}
                      className="fpImg"
                      loading="lazy"
                    />
                    <span className="fpName">{item.name}</span>
                    <span className="fpCity">{item.city}</span>
                    <span className="fpPrice">Starting from ${item.cheapestPrice}</span>

                    {
                      item.rating && <div className="fpRating">
                        <button>{item.rating}</button>
                        <span>Excellent</span>
                      </div>
                    }

                  </div>
                )
              })
            }

          </Fragment>
      }
    </div>
  );
};

export default FeaturedProperties;
