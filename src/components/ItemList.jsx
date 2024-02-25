import ItemCard from "./ItemCard.jsx";


const ItemList = ({ vestidos }) => {

    return (
        <div>
            <div className="vestidos">
                {vestidos.map((item) => <ItemCard key={item.id} item={item} />)}
            </div>

        </div>
    );
};

export default ItemList;