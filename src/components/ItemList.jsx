import Item from './Item'
import PropTypes from 'prop-types'

function ItemList({ items }) {
  return (
    <div className="container-fluid estiloContainer">
      <div className="row estiloCards">
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </div>
    </div>
  )
}

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
}

export default ItemList
