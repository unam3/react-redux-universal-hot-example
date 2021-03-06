const React = require('react');
import { CostFilter } from '../CostFilter/CostFilter';
import { BrandFilter } from '../BrandFilter/BrandFilter';

export const Filters = ({products}) => (
  //<code>
  //  { JSON.stringify(products) }
  //</code>
  <section className="filters product-list__filters flex-column">
    <CostFilter products={products} />
    <BrandFilter products={products} />
    <div className="filters__controls flex-row">
      <div className="control__wrapper">
        <input type="button" value="Применить" />
      </div>
      <div className="control__wrapper">
        <a href="#"
          onClick={function (e) {
            e.preventDefault();
            console.log('reset filters');
          }}
          >Сбросить</a>
      </div>
    </div>
  </section>
);
