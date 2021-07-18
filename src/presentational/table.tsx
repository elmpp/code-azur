import { ServiceResItem } from "../data/service";

interface ItemTableProps {
  items: ServiceResItem[]
  currentDay: number
}
export const ItemTable: React.FC<ItemTableProps> = ({ items, currentDay }) => {

  return (
    <table style={{width: '100%'}}>
      <thead style={{fontWeight: 600, fontSize: '1.2em'}}>
        <tr>
          <td>Name</td>
          <td>Quality</td>
          <td>Sell By</td>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <ItemRow item={item} currentDay={currentDay} />
        ))}
      </tbody>
    </table>
  );
};

interface ItemRowProps {
  item: ServiceResItem;
  currentDay: number;
}
export const ItemRow: React.FC<ItemRowProps> = ({ item, currentDay }) => {
  return (
    <tr style={{height: '1.5em'}}>
      <td>{item.name}</td>
      <td>{item.quality > 0 ? item.quality : "Expired"}</td>
      <td>{currentDay > item.sellIn ? "-" : item.sellIn - currentDay}</td>
    </tr>
  );
};
